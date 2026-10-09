<template>
    <div>
        <h1>Books with ISBN > {{ minIsbn }}</h1>

        <!-- Query controls: where (minimum ISBN), orderBy (direction) and limit. -->
        <div class="query-controls">
            <label for="minIsbn">ISBN greater than:</label>
            <input type="number" v-model.number="minIsbn" id="minIsbn" />

            <label for="direction">Order by ISBN:</label>
            <select v-model="direction" id="direction">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>

            <label for="maxResults">Limit:</label>
            <input type="number" v-model.number="maxResults" id="maxResults" min="1" />

            <button type="button" @click="fetchBooks">Run query</button>
        </div>

        <ul>
            <li v-for="book in books" :key="book.id">
                <template v-if="editingId === book.id">
                    <input type="text" v-model="editIsbn" aria-label="ISBN" />
                    <input type="text" v-model="editName" aria-label="Name" />
                    <button type="button" @click="saveEdit(book.id)">Save</button>
                    <button type="button" @click="cancelEdit">Cancel</button>
                </template>
                <template v-else>
                    {{ book.name }} - ISBN: {{ book.isbn }}
                    <button type="button" @click="startEdit(book)">Edit</button>
                    <button type="button" @click="deleteBook(book)">Delete</button>
                </template>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore'

const books = ref([])

const minIsbn = ref(1000)
const direction = ref('asc')
const maxResults = ref(10)

const editingId = ref(null)
const editIsbn = ref('')
const editName = ref('')

const fetchBooks = async () => {
    try {
        // where, orderBy and limit combined in one query. Firestore requires
        // the first orderBy to be on the same field as a range filter (>),
        // so ordering by isbn here needs no composite index. The comparison
        // only matches documents where isbn is stored as a number, which is
        // why AddBookView converts it before saving.
        const q = query(
            collection(db, 'books'),
            where('isbn', '>', minIsbn.value),
            orderBy('isbn', direction.value),
            limit(maxResults.value)
        )
        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() })
        })
        books.value = booksArray
    } catch (error) {
        console.error('Error fetching books: ', error)
    }
}

const startEdit = (book) => {
    editingId.value = book.id
    editIsbn.value = String(book.isbn)
    editName.value = book.name
}

const cancelEdit = () => {
    editingId.value = null
}

const saveEdit = async (id) => {
    // Same ISBN normalisation as AddBookView, so the where query keeps working.
    const digits = editIsbn.value.replace(/\D/g, '')
    if (digits === '') {
        alert('ISBN must contain digits')
        return
    }
    try {
        await updateDoc(doc(db, 'books', id), {
            isbn: Number(digits),
            name: editName.value
        })
        editingId.value = null
        alert('Book updated successfully!')
        fetchBooks()
    } catch (error) {
        console.error('Error updating book: ', error)
    }
}

const deleteBook = async (book) => {
    if (!confirm(`Delete "${book.name}"?`)) return
    try {
        await deleteDoc(doc(db, 'books', book.id))
        alert('Book deleted successfully!')
        fetchBooks()
    } catch (error) {
        console.error('Error deleting book: ', error)
    }
}

onMounted(() => {
    fetchBooks()
})

// Let the parent (AddBookView) refresh the list after adding a book.
defineExpose({ fetchBooks })
</script>

<style scoped>
.query-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    margin-bottom: 1rem;
}

li button {
    margin-left: 0.5rem;
}
</style>
