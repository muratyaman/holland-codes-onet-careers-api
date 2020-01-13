CREATE TABLE jobs
(
    id             VARCHAR(10)   NOT NULL,
    title_en       VARCHAR(250)  NOT NULL,
    title_ar       VARCHAR(250)  NOT NULL,
    description_en TEXT          NOT NULL,
    description_ar TEXT          NOT NULL,
    zone_id        INTEGER       NOT NULL,
    active         INTEGER       NOT NULL,
    r              DECIMAL(4, 2) NOT NULL,
    i              DECIMAL(4, 2) NOT NULL,
    a              DECIMAL(4, 2) NOT NULL,
    s              DECIMAL(4, 2) NOT NULL,
    e              DECIMAL(4, 2) NOT NULL,
    c              DECIMAL(4, 2) NOT NULL,

    PRIMARY KEY (id ASC)
);

CREATE INDEX IX_jobs_active ON jobs (active ASC);

CREATE TABLE industries
(
    id             INTEGER       NOT NULL,
    title_en       VARCHAR(250)  NOT NULL,
    title_ar       VARCHAR(250)  NOT NULL,
    description_en TEXT          NOT NULL,
    description_ar TEXT          NOT NULL,

    PRIMARY KEY (id ASC)
);

CREATE TABLE jobs_industries
(
    job_id      VARCHAR(10)  NOT NULL,
    industry_id INTEGER      NOT NULL,

    PRIMARY KEY (job_id ASC, industry_id ASC),
    FOREIGN KEY (job_id) REFERENCES jobs (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (industry_id) REFERENCES industries (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX FK_jobs_industries_job_id ON jobs_industries (job_id ASC);
CREATE INDEX FK_jobs_industries_industry_id ON jobs_industries (industry_id ASC);

