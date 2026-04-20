CREATE TABLE `wallet` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(64) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

ALTER TABLE `purchase` ADD COLUMN `wallet_id` int(11) NULL;
ALTER TABLE `purchase` ADD CONSTRAINT `fk_purchase_wallet` FOREIGN KEY (`wallet_id`) REFERENCES `wallet`(`id`) ON DELETE SET NULL;