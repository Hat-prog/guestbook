CREATE TABLE messages (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    msg_name TEXT,
    content TEXT
);

INSERT INTO messages (msg_name, content) VALUES 
('Andrey', 'Just passing through and leaving my mark here'),
('Dimitrov', 'Had a great time checking this out, would definitely recommend it.'),
('Ashley', 'Great vibes here, I''ll definitely be back'),
('Lily', 'Just passing through and leaving my mark here');
