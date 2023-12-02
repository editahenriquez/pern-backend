-- Create table
CREATE TABLE task (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(300),
    done BOOLEAN NOT NULL DEFAULT false,
    createdAt TIMESTAMP NOT NULL DEFAULT current_timestamp
);

-- Insert data
INSERT INTO task (title, description) VALUES('Administration', 'Responding to project queries'),
('Meetings', 'Internally with clients'),
('Planning', 'Researching ideas for specific activities'),
('Running an Event', 'Seeing initiatives organized');
