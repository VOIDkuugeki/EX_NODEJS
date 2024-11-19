const Category = require('./path/to/category.model.js'); // Adjust the path as necessary

const newCategory = new Category({
    name: 'Sample Category',
    img: 'sample-image-url.jpg'
});

newCategory.save()
    .then(() => console.log('Category saved successfully'))
    .catch(err => console.error('Error saving category:', err));