<template>
    <div>
        <h1>Add Book</h1>
        <form @submit.prevent="addBook">
            <div>
                <label for="isbn">ISBN:</label>
                <input type="text" v-model="isbn" id="isbn" required />
            </div>
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="name" id="name" required />
            </div>
            <button type="submit">Add Book</button>
        </form>
        <BookList />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import db from '../firebase/init.js'
import { collection, addDoc } from 'firebase/firestore'
import BookList from '../components/BookList.vue'

const isbn = ref('')
const name = ref('')

const addBook = async () => {
    try {
        // Firestore stores whatever type it is given; the input is a string,
        // so convert isbn to a number before saving. Real ISBNs are written
        // with hyphens (978-1-98217-200-8), so strip everything that is not
        // a digit first.
        const digits = isbn.value.replace(/\D/g, '')
        if (digits === '') {
            alert('ISBN must contain digits')
            return
        }
        const isbnNumber = Number(digits)
        await addDoc(collection(db, 'books'), {
            isbn: isbnNumber,
            name: name.value
        })
        isbn.value = ''
        name.value = ''
        alert('Book added successfully!')
    } catch (error) {
        console.error('Error adding book: ', error)
    }
}
</script>
