console.log('JavaScript файл завантажено успішно! ✅');

document.addEventListener('DOMContentLoaded', function() {
    const testButton = document.getElementById('testButton');
    
    if (testButton) {
        testButton.addEventListener('click', function() {
            alert('JavaScript працює коректно! 🎉');
            console.log('Кнопка була натиснута - все працює!');
            
            // Додатково можна змінити колір тексту при кліку
            const testText = document.querySelector('main p');
            if (testText) {
                testText.style.color = '#e74c3c';
                testText.textContent = 'JavaScript працює! Текст змінив колір! 🎉';
            }
        });
    } else {
        console.log('Кнопка не знайдена! Перевір HTML');
    }
});