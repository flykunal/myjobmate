CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(30) NOT NULL,
  preferred_language VARCHAR(30) NOT NULL,
  tutor_preference VARCHAR(30) NOT NULL,
  status VARCHAR(30) DEFAULT 'ACTIVE'
);

CREATE TABLE user_profiles (
  user_id BIGINT PRIMARY KEY,
  headline VARCHAR(255),
  bio TEXT,
  current_level VARCHAR(50),
  daily_minutes INT,
  target_timeline_weeks INT,
  target_role VARCHAR(120)
);

CREATE TABLE roadmaps (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  goal VARCHAR(150) NOT NULL,
  current_level VARCHAR(50),
  timeline_weeks INT,
  generated_by VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roadmap_topics (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  roadmap_id BIGINT NOT NULL,
  week_number INT NOT NULL,
  topic_key VARCHAR(180) NOT NULL,
  topic_name VARCHAR(180) NOT NULL,
  description TEXT,
  practice_task TEXT,
  project_task TEXT
);

CREATE TABLE resources (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  topic_key VARCHAR(180) NOT NULL,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  language VARCHAR(30),
  tutor_style VARCHAR(30),
  difficulty VARCHAR(30),
  duration_minutes INT,
  provider VARCHAR(100)
);

CREATE TABLE topic_progress (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  topic_id BIGINT NOT NULL,
  status VARCHAR(30) NOT NULL,
  completed_at TIMESTAMP NULL,
  time_spent_minutes INT DEFAULT 0
);

CREATE TABLE daily_tasks (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  task_date DATE NOT NULL,
  source_type VARCHAR(60),
  source_ref_id BIGINT,
  title VARCHAR(255) NOT NULL,
  status VARCHAR(30) NOT NULL,
  xp_points INT DEFAULT 0
);

CREATE TABLE resume_analyses (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  file_name VARCHAR(255),
  extracted_text LONGTEXT,
  ats_score INT,
  summary TEXT,
  suggestions_json JSON
);
