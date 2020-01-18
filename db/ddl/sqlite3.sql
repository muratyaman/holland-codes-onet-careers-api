CREATE TABLE gca_jobs
(
    id             VARCHAR(10)   NOT NULL,
    title_en       VARCHAR(250)  NOT NULL,
    title_ar       VARCHAR(250)  NOT NULL,
    description_en TEXT          NOT NULL,
    description_ar TEXT          NOT NULL,
    active         INTEGER       NOT NULL,
    r              DECIMAL(4, 2) NOT NULL,
    i              DECIMAL(4, 2) NOT NULL,
    a              DECIMAL(4, 2) NOT NULL,
    s              DECIMAL(4, 2) NOT NULL,
    e              DECIMAL(4, 2) NOT NULL,
    c              DECIMAL(4, 2) NOT NULL,

    PRIMARY KEY (id ASC)
);

CREATE INDEX IX_gca_jobs_active ON gca_jobs (active ASC);

CREATE TABLE gca_sectors
(
    id             VARCHAR(3)    NOT NULL,
    title_en       VARCHAR(250)  NOT NULL,
    title_ar       VARCHAR(250)  NOT NULL,

    PRIMARY KEY (id ASC)
);

CREATE TABLE gca_subsectors
(
    sector_id      VARCHAR(3)    NOT NULL,
    id             VARCHAR(3)    NOT NULL,
    title_en       VARCHAR(250)  NOT NULL,
    title_ar       VARCHAR(250)  NOT NULL,

    PRIMARY KEY (id ASC),
    FOREIGN KEY (sector_id) REFERENCES gca_sectors (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE gca_jobs_subsectors
(
    job_id       VARCHAR(10)  NOT NULL,
    subsector_id VARCHAR(3)   NOT NULL,

    PRIMARY KEY (job_id ASC, subsector_id ASC),
    FOREIGN KEY (job_id) REFERENCES gca_jobs (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (subsector_id) REFERENCES gca_subsectors (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX FK_jobs_subsectors_job_id ON gca_jobs_subsectors (job_id ASC);
CREATE INDEX FK_jobs_subsectors_subsector_id ON gca_jobs_subsectors (subsector_id ASC);

/*
CREATE TABLE qualifications
(
    id        VARCHAR(12)  NOT NULL,
    title_en  VARCHAR(100) NOT NULL,
    title_ar  VARCHAR(100) NOT NULL,

    PRIMARY KEY (id ASC)
);
*/

CREATE TABLE gca_subsectors_qualifications
(
    subsector_id     VARCHAR(3)  NOT NULL,
    qualification_id VARCHAR(12) NOT NULL,

    PRIMARY KEY (subsector_id ASC, qualification_id ASC),
    FOREIGN KEY (subsector_id) REFERENCES gca_subsectors (id) ON UPDATE CASCADE ON DELETE CASCADE
    -- TODO: check table name
    -- FOREIGN KEY (qualification_id) REFERENCES qualifications (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX FK_gca_subsectors_qualifications_subsector_id ON gca_subsectors_qualifications (subsector_id ASC);
CREATE INDEX FK_gca_subsectors_qualifications_qualification_id ON gca_subsectors_qualifications (qualification_id ASC);
