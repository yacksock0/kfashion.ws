USE kfashion;

##
## for Spring Session
#
CREATE TABLE SPRING_SESSION (
    PRIMARY_ID CHAR(36) NOT NULL,
    SESSION_ID CHAR(36) NOT NULL,
    CREATION_TIME BIGINT NOT NULL,
    LAST_ACCESS_TIME BIGINT NOT NULL,
    MAX_INACTIVE_INTERVAL INT NOT NULL,
    EXPIRY_TIME BIGINT NOT NULL,
    PRINCIPAL_NAME VARCHAR(100),

    CONSTRAINT SPRING_SESSION_PK PRIMARY KEY (PRIMARY_ID)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC;

CREATE UNIQUE INDEX SPRING_SESSION_IX1 ON SPRING_SESSION (SESSION_ID);
CREATE INDEX SPRING_SESSION_IX2 ON SPRING_SESSION (EXPIRY_TIME);
CREATE INDEX SPRING_SESSION_IX3 ON SPRING_SESSION (PRINCIPAL_NAME);


CREATE TABLE SPRING_SESSION_ATTRIBUTES (
    SESSION_PRIMARY_ID CHAR(36) NOT NULL,
    ATTRIBUTE_NAME VARCHAR(200) NOT NULL,
    ATTRIBUTE_BYTES BLOB NOT NULL,

    CONSTRAINT SPRING_SESSION_ATTRIBUTES_PK PRIMARY KEY (SESSION_PRIMARY_ID, ATTRIBUTE_NAME),
    CONSTRAINT SPRING_SESSION_ATTRIBUTES_FK FOREIGN KEY (SESSION_PRIMARY_ID) REFERENCES SPRING_SESSION(PRIMARY_ID) ON DELETE CASCADE
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC;


##
## for Application
##

CREATE TABLE kfashion_user_group (
	no						INT				NOT NULL 	AUTO_INCREMENT,
	group_name				NVARCHAR(64) 	NOT NULL,
	created_datetime		DATETIME		NOT NULL,
	updated_datetime		DATETIME		NOT NULL,

  PRIMARY KEY (no)
);
​
​
CREATE TABLE kfashion_user_authority (
	no						INT 			NOT NULL	AUTO_INCREMENT,
	authority_name			NVARCHAR(64)	NOT NULL,
	created_datetime		DATETIME		NOT NULL,
	updated_datetime		DATETIME		NOT NULL,

	PRIMARY KEY (no)
);
​
CREATE TABLE kfashion_user_group_authority (
	authority_no			INT				NOT	NULL,	-- 외래키
	group_no				INT				NOT NULL,	-- 외래키
	created_datetime		DATETIME		NOT NULL,
	updated_datetime		DATETIME		NOT NULL,

	PRIMARY KEY (authority_no, group_no),
	CONSTRAINT fk_kfashion_user_group_authority_authority_no 	FOREIGN KEY (authority_no)
																REFERENCES 	kfashion_user_authority (no),
	CONSTRAINT fk_kfashion_user_group_authority_group_no 		FOREIGN KEY (group_no)
																REFERENCES 	kfashion_user_group (no)
);
​
CREATE TABLE kfashion_user_info (
	id						NVARCHAR(64)	NOT NULL,
	password				NVARCHAR(64)	NOT NULL,
	name					NVARCHAR(64)	NOT NULL,
	birth					DATETIME		NOT NULL,
	gender 					NVARCHAR(32)	NOT NULL,
	email					NVARCHAR(256)	NOT NULL,
	phone					NVARCHAR(64)	NULL,
	group_no				INT				NULL,						-- null  DEFAULT 1
	is_admin				CHAR(1)			NOT NULL 	DEFAULT 'N', 	-- boolean y/n DEFAULT n **************
	is_approved				CHAR(1)			NOT NULL	DEFAULT 'N',	-- boolean y/n DEFAULT n
	created_datetime		DATETIME		NOT NULL,
	updated_datetime		DATETIME		NOT NULL,

   PRIMARY KEY (id),
   CONSTRAINT fk_kfashion_user_info_group_no 			FOREIGN KEY (group_no)
														REFERENCES 	kfashion_user_group (no)
);
​
CREATE TABLE kfasion_user_group_admin (
	user_id					VARCHAR(64)		NOT	NULL,	-- 외래키
	group_no				INT				NOT NULL,	-- 외래키
	created_datetime		DATETIME		NOT NULL,
	updated_datetime		DATETIME		NOT NULL,

	PRIMARY KEY (user_id, group_no),
	CONSTRAINT fk_kfasion_user_group_admin_user_id 				FOREIGN KEY (user_id )
																REFERENCES 	kfashion_user_info (no),
	CONSTRAINT fk_kfasion_user_group_admin_group_no 			FOREIGN KEY (group_no)
																REFERENCES 	kfashion_user_group (no)
);
​
CREATE TABLE kfasion_user_group_admin (
	user_id					NVARCHAR(64)	NOT	NULL,	-- 외래키
	group_no				INT				NOT NULL,	-- 외래키
	created_datetime		DATETIME		NOT NULL,
	updated_datetime		DATETIME		NOT NULL,

	PRIMARY KEY (user_id, group_no),
	CONSTRAINT fk_kfasion_user_group_admin_user_id 				FOREIGN KEY (user_id)
																REFERENCES 	kfashion_user_info (id),
	CONSTRAINT fk_kfasion_user_group_admin_group_no 			FOREIGN KEY (group_no)
																REFERENCES 	kfashion_user_group (no)
);
​
CREATE TABLE kfashion_email_authority (
	user_id					NVARCHAR(64)	NOT NULL,	-- 외래키*******
	authkey					NVARCHAR(64)	NOT NULL,
	expiration_datetime		DATETIME  		NOT NULL,
	authority_datetime		DATETIME 		NULL, 		-- 인증받기 전엔 null
	created_datetime		DATETIME		NOT NULL,

	PRIMARY KEY (user_id),
	CONSTRAINT fk_kfashion_email_authrity_user_id 		FOREIGN KEY (user_id)
														REFERENCES 	kfashion_user_info (id)
  );

CREATE TABLE kfashion_work (
	no						BIGINT			NOT NULL	AUTO_INCREMENT,
	work_name				NVARCHAR(128)	NOT NULL,
	work_state				INT				NOT NULL,
	created_datetime		DATETIME		NOT NULL,
	updated_datetime		DATETIME		NOT NULL,

  PRIMARY KEY (no)
);
​
CREATE TABLE kfashion_image (
	work_no					BIGINT			NOT NULL,
	img_data				LONGBLOB		NOT NULL,
	created_datetime		DATETIME		NOT NULL,
	updated_datetime		DATETIME		NOT NULL,
  PRIMARY KEY (work_no),
  CONSTRAINT fk_kfashion_image_work_no 	FOREIGN KEY (work_no)
											REFERENCES 	kfashion_work (no)
);
​
CREATE TABLE kfashion_work_history (
	work_no					BIGINT 			NOT NULL,	-- 외래키
	work_step				INT				NOT NULL,   -- AUTO_INCREMENT
	created_id				NVARCHAR(64)	NOT NULL,
	created_datetime		DATETIME		NOT NULL,
	updated_datetime		DATETIME		NOT NULL,

	PRIMARY KEY (work_no, work_step),
	CONSTRAINT fk_kfashion_work_history_work_no 	FOREIGN KEY (work_no)
													REFERENCES 	kfashion_work (no)
);
​
CREATE TABLE kfashion_image_location_rect (
	work_no					BIGINT			NOT NULL,	-- 외래키
	work_step				INT				NOT NULL,	-- 외래키
	rect_no					INT				NOT NULL,	-- 외래키
	location_x				FLOAT			NOT NULL,
	location_y				FLOAT			NOT NULL,
	location_width			INT				NOT NULL,
	location_height			INT				NOT NULL,
	scale_X					FLOAT			NOT NULL,
	scale_Y					FLOAT			NOT NULL,
	created_datetime		DATETIME		NOT NULL,
	updated_datetime		DATETIME		NOT NULL,

  PRIMARY KEY (work_no, work_step, rect_no),
  CONSTRAINT fk_kfashion_image_location_rect_work_no_work_step	FOREIGN KEY (work_no,work_step)
																REFERENCES 	kfashion_work_history (work_no, work_step)
);
​
CREATE TABLE kfashion_image_location_polygon (
	work_no					BIGINT			NOT NULL,	-- 외래키
	work_step				INT				NOT NULL,	-- 외래키
	rect_no					INT				NOT NULL,	-- 외래키
   no						INT				NOT NULL,	-- increament
	created_datetime		DATETIME		NOT NULL,
	updated_datetime		DATETIME		NOT NULL,

	PRIMARY KEY (work_no, work_step, rect_no, no),
  CONSTRAINT fk_kfashion_image_location_polygon_work_no_work_step_rect_no 	FOREIGN KEY (work_no, work_step, rect_no)
																			REFERENCES 	kfashion_image_location_rect (work_no,work_step, rect_no)
);
​
CREATE TABLE kfashion_image_location_polygon_point (
	work_no					BIGINT			NOT NULL,	-- 외래키
	work_step				INT				NOT NULL,	-- 외래키
   rect_no					INT				NOT NULL,	-- 외래키
	polygon_no				INT				NOT NULL,	-- 외래키
	no						INT				NOT NULL,	-- increament
	location_x				FLOAT			NOT NULL,
	location_y				FLOAT			NOT NULL,
	location_seq			INT				NOT NULL,
	created_datetime		DATETIME		NOT NULL,
	updated_datetime		DATETIME		NOT NULL,

	PRIMARY KEY (work_no, work_step, rect_no, polygon_no, no),
	CONSTRAINT fk_kfashion_image_location_polygon_point_work_no_work_step				FOREIGN KEY (work_no, work_step, rect_no, polygon_no)
																						REFERENCES 	kfashion_image_location_polygon (work_no, work_step, rect_no, no)
);
​
CREATE TABLE kfashion_category (
	no						INT				NOT NULL 	AUTO_INCREMENT,
	category_name			NVARCHAR(64)	NOT NULL,
	category_step			INT				NOT NULL,
	group_no				INT				NOT NULL,	-- 외래키
	created_id				NVARCHAR(64)	NOT NULL,	-- 외래키
	updated_id				NVARCHAR(64)	NOT NULL,	-- 외래키
	created_datetime		DATETIME		NOT NULL,
	updated_datetime		DATETIME		NOT NULL,

	PRIMARY KEY (no),
	CONSTRAINT fk_kfashion_category_group_no 			FOREIGN KEY (group_no)
														REFERENCES 	kfashion_user_group (no),
	CONSTRAINT fk_kfashion_category_created_id			FOREIGN KEY (created_id)
														REFERENCES 	kfashion_user_info (id),
	CONSTRAINT fk_kfashion_category_updated_id 			FOREIGN KEY (updated_id)
														REFERENCES 	kfashion_user_info (id)
);
​
CREATE TABLE kfashion_category_item (
	no						INT				NOT NULL 	AUTO_INCREMENT,
	category_no				INT 			NOT	NULL,	-- 외래키
	category_item_name		NVARCHAR(64)	NOT NULL,
	created_id				NVARCHAR(64)	NOT NULL,	-- 외래키
	updated_id				NVARCHAR(64)	NOT NULL,	-- 외래키
	created_datetime		DATETIME		NOT NULL,
	updated_datetime		DATETIME		NOT NULL,

	PRIMARY KEY (no, category_no),
	CONSTRAINT fk_kfashion_category_item_category_no	FOREIGN KEY (category_no)
														REFERENCES 	kfashion_category (no),
	CONSTRAINT fk_kfashion_category_item_created_id		FOREIGN KEY (created_id)
														REFERENCES 	kfashion_user_info (id),
	CONSTRAINT fk_kfashion_category_item_updated_id 	FOREIGN KEY (updated_id)
														REFERENCES 	kfashion_user_info (id)
);
​
CREATE TABLE kfashion_label (
	work_no					BIGINT			NOT NULL,	-- 외래키
	work_step				INT				NOT NULL,	-- 외래키
	rect_no					INT				NOT NULL,	-- 외래키
	polygon_no				INT				NOT NULL,	-- 외래키
	no						INT				NOT NULL,	-- 1234...
	category_no				INT				NOT NULL,	-- 외래키
	category_item_no		INT				NOT NULL,	-- 외래키
	created_id				NVARCHAR(64)	NOT NULL,
	created_datetime		DATETIME		NOT NULL,
	updated_datetime		DATETIME		NOT NULL,

	PRIMARY KEY (work_no, work_step, rect_no, polygon_no, no),
	CONSTRAINT fk_kfashion_label_work_no_work_step_rect_no_polygon_no	FOREIGN KEY (work_no, work_step, rect_no, polygon_no)
																		REFERENCES 	kfashion_image_location_polygon (work_no, work_step, rect_no, no),
	CONSTRAINT fk_kfashion_label_category_no 							FOREIGN KEY (category_no)
																		REFERENCES 	kfashion_category_item (no),
	CONSTRAINT fk_kfashion_label_category_item_no 						FOREIGN KEY (category_item_no)
																		REFERENCES 	kfashion_category_item (category_no)
);