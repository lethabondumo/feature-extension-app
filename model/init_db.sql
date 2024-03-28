-- Drop existing tables if they exist
SET foreign_key_checks = 0;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS shift_client_assignment;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS availability;
DROP TABLE IF EXISTS shifts;
DROP TABLE IF EXISTS cleaners;
DROP TABLE IF EXISTS allocations;
SET foreign_key_checks = 1;

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS sunshine_cleaning;

-- Use the sunshine_cleaning database
USE sunshine_cleaning;

-- Create table for cleaners
CREATE TABLE IF NOT EXISTS cleaners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    date_of_birth VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_country VARCHAR(10),
    phone_number VARCHAR(30),
    hourly_rate DECIMAL(10, 2) NOT NULL,
    usual_availability TEXT NOT NULL
);

-- Create table for bookings
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    booking_date VARCHAR(10) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    phone_country VARCHAR(10),
    phone_number VARCHAR(30),
    building_type VARCHAR(50),
    street_number VARCHAR(50),
    street_name VARCHAR(255),
    apartment_building_name VARCHAR(255),
    apartment_number VARCHAR(50),
    complex_name VARCHAR(255),
    unit_number VARCHAR(50),
    other_address_description TEXT,
    area VARCHAR(255)
);

-- Insert sample data for cleaners
INSERT INTO cleaners (firstname, lastname, date_of_birth, email, phone_country, phone_number, hourly_rate, usual_availability) 
VALUES 
("Elijah", "Gonzalez", "1990-05-15", "elijah.gonzalez@egmail.com", "+49", "+491234567890", 25.50, "Monday-Friday: 08:00-16:00"),
("Aria", "Martinez", "1985-12-20", "aria.martinez@gmail.com", "+49", "+491234567891", 30.00, "Weekends: 10:00-18:00"),
("Liam", "Brown", "1992-09-30", "liam.brown@icloud.com", "+49", "+491234567892", 28.00, "Flexible schedule"),
("Olivia", "Taylor", "1988-07-10", "olivia.taylor@mweb.com", "+49", "+491234567893", 32.00, "Tuesday, Thursday: 09:00-17:00");

-- Insert sample data for bookings 
INSERT INTO bookings (firstname, lastname, booking_date, start_time, end_time, phone_country, phone_number, building_type, street_number, street_name, apartment_building_name, apartment_number, complex_name, unit_number, other_address_description, area)
VALUES 
('Lethabo', 'Ndumo', '2024-04-01', '14:00:00', '16:00:00', '+49', '+4930111222333', 'Standalone House', '789', 'Oak Street', NULL, NULL, NULL, NULL, NULL, 'Berlin'),
('Lutendo', 'Ndumo', '2024-04-02', '09:00:00', '12:00:00', '+49', '+4930444555666', 'Apartment', '123', 'Maple Avenue', 'Sunrise Towers', '5A', NULL, NULL, NULL, 'Potsdam'),
('Dini', 'Mawela', '2024-04-03', '10:00:00', '13:00:00', '+49', '+4930111222333', 'Standalone House', '456', 'Cedar Street', NULL, NULL, NULL, NULL, NULL, 'Munich'),
('Neville', 'Ndumo', '2024-04-04', '13:00:00', '15:00:00', '+49', '+4930111222333', 'Other', '265', 'Broadway Cove', NULL, NULL, NULL, NULL, 'Amazon, Block B, Office 3A', 'Frankfurt');
