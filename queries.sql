create database devninjas;

create table users (
	id int primary key unique auto_increment,
    name varchar(100),
    email varchar(50) unique,
    password varchar(100)
);

create table products (
	id int primary key auto_increment not null unique,
    sku bigint not null unique,
    name varchar(200) not null unique,
    price double,
    created_at datetime,
    updated_at datetime
);

create table customers (
	id int not null unique primary key unique,
    name varchar(200) not null,
    cpf varchar (15) not null unique,
    email varchar(200) not null unique,
    created_at datetime,
    updated_at datetime
);

create table orders (
	id int not null unique primary key,
    customer_id int not null,
    total double not null,
    status varchar(15) not null,
    created_at datetime,
    foreign key(customer_id) references customers(id)
);

create table items (
	id int not null unique primary key auto_increment,
    order_id int not null,
    product_id int not null,
    amount int not null,
    price_unit double not null,
    total double not null,
    foreign key(order_id) references orders(id),
    foreign key(product_id) references products(id)
);
