-- Run this once in phpMyAdmin (Import tab, or paste into the SQL tab)
-- against the empty database you created for this site.

SET NAMES utf8mb4;

CREATE TABLE articles (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title         VARCHAR(500)  NOT NULL,
  summary       TEXT          NOT NULL,
  content1      MEDIUMTEXT    NOT NULL,
  content2      MEDIUMTEXT    NOT NULL DEFAULT '',
  image         VARCHAR(500)  NOT NULL,
  published_at  DATETIME      NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- One row per book that has an admin-set price/stock override; a book with
-- no row here just uses the price hard-coded in the frontend and is always
-- in stock. stock = NULL means "not tracked, always available".
CREATE TABLE book_overrides (
  book_id  VARCHAR(100)  NOT NULL PRIMARY KEY,
  price    INT UNSIGNED  NULL,
  stock    INT UNSIGNED  NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE orders (
  id                    VARCHAR(50)   NOT NULL PRIMARY KEY,
  created_at            DATETIME(3)   NOT NULL,
  full_name             VARCHAR(255)  NOT NULL,
  phone                 VARCHAR(50)   NOT NULL,
  city                  VARCHAR(255)  NOT NULL,
  address               TEXT          NOT NULL,
  postal_code           VARCHAR(50)   NULL,
  preferred_call_time   VARCHAR(100)  NULL,
  items                 JSON          NOT NULL,
  total                 INT UNSIGNED  NOT NULL,
  status                VARCHAR(100)  NOT NULL DEFAULT 'در انتظار تماس',
  INDEX (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- A single row (id = 1) holding the site's editable contact info and social links.
CREATE TABLE settings (
  id                TINYINT UNSIGNED NOT NULL PRIMARY KEY DEFAULT 1,
  contact_phone     VARCHAR(50)   NOT NULL DEFAULT '',
  contact_email     VARCHAR(255)  NOT NULL DEFAULT '',
  support_note      TEXT          NOT NULL,
  social_instagram  VARCHAR(255)  NULL,
  social_telegram   VARCHAR(255)  NULL,
  social_whatsapp   VARCHAR(255)  NULL,
  social_eitaa      VARCHAR(255)  NULL,
  CONSTRAINT single_row CHECK (id = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO settings (id, contact_phone, contact_email, support_note, social_instagram, social_telegram, social_whatsapp, social_eitaa)
VALUES (
  1,
  '09108083995',
  'alireza.akhavan.safaei.00@gmail.com',
  'برای دریافت مشاوره درباره کتاب و پاسخ به سوالات خود، می‌توانید در ساعات ۸ تا ۲۰ با شماره فوق تماس بگیرید یا از طریق ایمیل با ما در ارتباط باشید.',
  'https://instagram.com/work_discipline_book',
  'https://t.me/Akhavan_safaei',
  'https://wa.me/989108083995',
  'https://eitaa.com/Akhavan_safaei'
);
