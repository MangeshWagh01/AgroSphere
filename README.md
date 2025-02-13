# AgroSphere 🌾

AgroSphere is a platform that connects farmers and buyers, allowing farmers to book appointments at the market to sell their products, while buyers can browse and purchase fresh produce.

🚀 Features
    Farmer Appointment Booking: Farmers can schedule appointments at the market to sell their products.
    Product Listing and Purchase: Buyers can browse products and make purchases directly through the platform. 
    Market Information: Displays details of various markets, including name, address, district, and state.
    Dynamic Market Rates: Shows market rates for different products, updated in real-time.
  	User Authentication: Secure login system with a personalized dashboard displaying the user’s name.

🛠️ Tech Stack
   Frontend: ReactJS, CSS, Bootstrap
   Backend: Spring Boot
   Database: MySQL


⚙️ Installation and Setup
	1. Clone the Repository
		 git clone https://github.com/MangeshWagh01/AgroSphere.git
     cd AgroSphere
	2. Backend Setup (Spring Boot)
		Navigate to the Backend directory.
		Make sure you have Java and Maven installed.
		Update the database configuration in application.properties.
		Run the Spring Boot application:
		mvn spring-boot:run
	3. Frontend Setup (ReactJS)
		Navigate to the Frontend directory.
		Install dependencies:
			npm install
		Start the React development server
			npm start

🗃️ Database Structure
Tables:
	market,
	market_rate, 
	appointment, 
	order,
	product,
  users

