CREATE TABLE `product` (
	`id` varchar(255) NOT NULL DEFAULT 'uuid()',
	`name` varchar(255) NOT NULL,
	`price` int NOT NULL,
	`nutri` varchar(2),
	CONSTRAINT `product_id` PRIMARY KEY(`id`)
);
