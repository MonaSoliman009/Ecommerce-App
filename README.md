Angular E-Commerce Store
This is a basic e-commerce web application built with Angular, Angular Material, and Sass. The app provides a seamless shopping experience with distinct roles for Admin and User. Admins can manage products (add, update, delete), while Users can explore and filter products by categories.


Features
Login Display

Static Login Credentials:
User:
Username: user
Password: user



Admin:
Username: admin
Password: admin



Basic authentication logic determines the user's role and privileges.

Role-Based Views
Admin View


Display all products in a table with pagination for better data management.
CRUD functionality:
Add new products (with image upload via Cloudinary).
Update existing products.
Delete products.
Fully interactive, role-restricted admin page.


-----------------------
User View
Show products grouped by categories.
Include a filtering section for better navigation of products.
Loading animations while fetching data for a smooth user experience.
Dynamic product display with animations for transitions.
Each product card provides detailed product information.



Technology Stack
Angular: Frontend framework.
Angular Material: For UI components like tables, modals, and forms.
Sass: For styling and efficient design.
Cloudinary: For uploading and managing product images.



Installation and Setup

Navigate to the project folder:
cd angular-ecommerce-store


Install dependencies:
npm install



Run the application:
ng serve


Access the application at:
http://localhost:4200



Folder Structure

src/
├── app/
│   ├── components/           # Reusable components (e.g., product card, category display)
│   ├── services/             # API integrations and authentication services
│   ├── models/               # Data models (e.g., Product, Category, User)
│   ├── guards/               # Route guards for role-based access
├── environments/             # Environment-specific configuration
└── assets/                   # Images and static files


Deployment
Use the following command to build the app for production:
ng build --prod


