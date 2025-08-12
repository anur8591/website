<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'freshbasket_db');

// Create database connection
function getDBConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    return $conn;
}

// Initialize database tables
function initializeDatabase() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // Create database if it doesn't exist
    $sql = "CREATE DATABASE IF NOT EXISTS freshbasket_db";
    $conn->query($sql);
    
    // Select the database
    $conn->select_db(DB_NAME);
    
    // Create users table
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $conn->query($sql);
    
    // Create products table
    $sql = "CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        description TEXT,
        image_url VARCHAR(255),
        stock INT DEFAULT 0,
        category VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    $conn->query($sql);
    
    // Create cart table
    $sql = "CREATE TABLE IF NOT EXISTS cart (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT DEFAULT 1,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )";
    $conn->query($sql);
    
    // Insert sample products
    $sql = "SELECT COUNT(*) as count FROM products";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    
    if ($row['count'] == 0) {
        $sampleProducts = [
            ["Fresh Apples", 2.99, "Crisp and juicy red apples", "images/apples.jpg", 100, "Fruits"],
            ["Organic Bananas", 1.99, "Sweet organic bananas", "images/bananas.jpg", 150, "Fruits"],
            ["Whole Milk", 3.49, "Fresh whole milk 1L", "images/milk.jpg", 50, "Dairy"],
            ["Brown Bread", 2.49, "Healthy whole wheat bread", "images/bread.jpg", 75, "Bakery"],
            ["Chicken Breast", 8.99, "Fresh boneless chicken breast", "images/chicken.jpg", 30, "Meat"],
            ["Tomatoes", 1.99, "Fresh ripe tomatoes", "images/tomatoes.jpg", 80, "Vegetables"]
        ];
        
        $stmt = $conn->prepare("INSERT INTO products (name, price, description, image_url, stock, category) VALUES (?, ?, ?, ?, ?, ?)");
        
        foreach ($sampleProducts as $product) {
            $stmt->bind_param("sdssis<ask_followup_question>
<question>It appears that npm (Node.js package manager) is not installed or not available in the system PATH. Do you want me to help you install Node.js and npm on your system so we can proceed with setting up the backend server and SQL connection?</question>
</ask_followup_question>
