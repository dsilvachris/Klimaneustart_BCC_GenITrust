-- Klimaneustart Database Schema
-- Create database (run this separately as superuser)
-- CREATE DATABASE klimaneustart_db;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Themes lookup table
CREATE TABLE themes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);

-- Initiatives lookup table
CREATE TABLE initiatives (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    link TEXT NOT NULL
);

-- Main dialogues table
CREATE TABLE dialogues (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    notes TEXT,
    audio_note_url TEXT,
    observer_reflection TEXT,
    surprise TEXT,
    num_people INTEGER NOT NULL,
    duration INTEGER NOT NULL,
    location TEXT,
    is_anonymous BOOLEAN NOT NULL,
    consent_share_contact BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- PII Vault (isolated table)
CREATE TABLE participant_contact (
    dialogue_id INTEGER PRIMARY KEY REFERENCES dialogues(id),
    contact_info TEXT NOT NULL
);

-- Many-to-many linking tables
CREATE TABLE initiative_districts (
    initiative_id TEXT REFERENCES initiatives(id),
    district_name TEXT,
    PRIMARY KEY (initiative_id, district_name)
);

CREATE TABLE initiative_themes (
    initiative_id TEXT REFERENCES initiatives(id),
    theme_id TEXT REFERENCES themes(id),
    PRIMARY KEY (initiative_id, theme_id)
);

CREATE TABLE dialogue_districts (
    dialogue_id INTEGER REFERENCES dialogues(id),
    district_name TEXT,
    PRIMARY KEY (dialogue_id, district_name)
);

CREATE TABLE dialogue_interest_areas (
    dialogue_id INTEGER REFERENCES dialogues(id),
    interest_area_id TEXT REFERENCES themes(id),
    PRIMARY KEY (dialogue_id, interest_area_id)
);

CREATE TABLE dialogue_topic_selections (
    id SERIAL PRIMARY KEY,
    dialogue_id INTEGER NOT NULL REFERENCES dialogues(id),
    main_topic_id TEXT NOT NULL,
    sub_group_id TEXT NOT NULL,
    selected_option_id TEXT NOT NULL,
    custom_note TEXT
);

-- Indexes for performance
CREATE INDEX idx_dialogues_user_id ON dialogues(user_id);
CREATE INDEX idx_dialogues_created_at ON dialogues(created_at);
CREATE INDEX idx_dialogue_topic_selections_dialogue_id ON dialogue_topic_selections(dialogue_id);