const { onRequest } = require('firebase-functions/v2/https')
const { onDocumentWritten } = require('firebase-functions/v2/firestore')
const logger = require('firebase-functions/logger')
const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const cors = require('cors')({ origin: true })

initializeApp()
const db = getFirestore()

// HTTP function: returns how many documents are in the books collection.
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await db.collection('books').count().get()
      res.status(200).send({ count: snapshot.data().count })
    } catch (error) {
      logger.error('Error counting books', error)
      res.status(500).send('Error counting books')
    }
  })
})

// HTTP function: returns every book as JSON.
exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snapshot = await db.collection('books').get()
      const books = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      res.status(200).send(books)
    } catch (error) {
      logger.error('Error fetching books', error)
      res.status(500).send('Error fetching books')
    }
  })
})

// Firestore trigger: whenever a book is added or edited, capitalise all of
// its string fields. Writing the capitalised values back triggers this
// function again, so it stops when nothing is left to change.
exports.capitaliseBook = onDocumentWritten('books/{bookId}', async (event) => {
  const after = event.data.after
  if (!after.exists) return // the book was deleted

  const data = after.data()
  const updates = {}
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string' && value !== value.toUpperCase()) {
      updates[key] = value.toUpperCase()
    }
  }
  if (Object.keys(updates).length === 0) return

  logger.info(`Capitalising book ${event.params.bookId}`, updates)
  await after.ref.update(updates)
})
