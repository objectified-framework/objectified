DROP TABLE IF EXISTS obj.signup;
DROP INDEX IF EXISTS idx_signup_email_lower;

CREATE TABLE obj.signup (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email_address VARCHAR(255) NOT NULL,
    name TEXT NOT NULL,
    source TEXT NOT NULL,
    ip_address VARCHAR(80) NOT NULL,
    create_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT valid_email CHECK (email_address ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE UNIQUE INDEX idx_signup_email_lower ON obj.signup(LOWER(email_address));
