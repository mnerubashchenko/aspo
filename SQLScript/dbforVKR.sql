CREATE DATABASE RSSForVKR;
USE RSSForVKR;

CREATE TABLE BRANDS 
(ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_brand VARCHAR(40) UNIQUE);

INSERT INTO BRANDS VALUES ('00000000-0000-0000-0000-000000000000', '---');

CREATE TABLE TYPEDEV 
(ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_typedev VARCHAR(30) UNIQUE);

INSERT INTO TYPEDEV VALUES ('00000000-0000-0000-0000-000000000000', '---');

CREATE TABLE TYPEINTER 
(ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_typeinter VARCHAR(30) UNIQUE);

INSERT INTO TYPEINTER VALUES ('00000000-0000-0000-0000-000000000000', '---');

CREATE TABLE INTERFACES
(ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name VARCHAR (30),
IsReadyStatus VARCHAR (30),
IsUsed VARCHAR (30),
SelectedPort VARCHAR (30),
Type UNIQUEIDENTIFIER FOREIGN KEY REFERENCES TYPEINTER(ID),
IpInput VARCHAR (30),
ActualIp VARCHAR (30));

CREATE TABLE DEVICES
(ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Type UNIQUEIDENTIFIER FOREIGN KEY REFERENCES TYPEDEV(ID),
Caption VARCHAR(100),
Brand UNIQUEIDENTIFIER FOREIGN KEY REFERENCES BRANDS(ID),
Model VARCHAR (30),
Status VARCHAR (30),
IpInput VARCHAR (30),
ActualIp VARCHAR (30),
Port VARCHAR (30),
PositionNumber VARCHAR(10));

INSERT INTO DEVICES(ID, Model) VALUES ('00000000-0000-0000-0000-000000000000', '---');

CREATE TABLE TYPEMEASURE 
(ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_typemeasure VARCHAR (30) UNIQUE);

INSERT INTO TYPEMEASURE VALUES ('00000000-0000-0000-0000-000000000000', '---');

CREATE TABLE MEASURE
(ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Grouup VARCHAR (30),
isParent VARCHAR(10),
id_measure VARCHAR (30),
parentId VARCHAR(30),
Name VARCHAR(30),
Caption VARCHAR(40),
MinValue INT,
MaxValue INT,
isCheck VARCHAR (30),
Status VARCHAR (30),
Type UNIQUEIDENTIFIER FOREIGN KEY REFERENCES TYPEMEASURE(ID),
Factor VARCHAR (10),
Manual_measure VARCHAR (30));

CREATE TABLE PROGRAMMCOMMANDS 
(ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name VARCHAR (30),
Code VARCHAR (30),
LongName VARCHAR(100),
Device VARCHAR(20));

CREATE TABLE TELEMETRY
(ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
hasItems VARCHAR(20),
parentId VARCHAR(20),
LongName VARCHAR (30),
ShortName VARCHAR (30),
ByteNumber INT,
StartBit INT,
Lenght INT,
PossibleValues_telemetry VARCHAR (30),
Value VARCHAR(20));

CREATE TABLE ROLES 
(ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_role VARCHAR (30) UNIQUE);

INSERT INTO ROLES VALUES ('00000000-0000-0000-0000-000000000000', '---');
INSERT INTO ROLES VALUES ('7dcb0637-af2c-4ae2-acf0-8413fe455402', '�������������');
INSERT INTO ROLES VALUES ('775ACD72-5459-EA11-B83A-645106511DF0', '�����');

CREATE TABLE POSTS
(ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_post VARCHAR(30) UNIQUE);

INSERT INTO POSTS VALUES ('00000000-0000-0000-0000-000000000000', '---');

CREATE TABLE USERS 
(ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_user VARCHAR (30),
Middlename_user VARCHAR (30),
Lastname_user VARCHAR (30),
Login_user VARCHAR(40) UNIQUE,
Password_user TEXT,
Post_user UNIQUEIDENTIFIER FOREIGN KEY REFERENCES POSTS(ID),
Role_user UNIQUEIDENTIFIER FOREIGN KEY REFERENCES ROLES(ID));

INSERT INTO USERS (ID, Middlename_user, Login_user) VALUES ('00000000-0000-0000-0000-000000000000', '---', '---');
INSERT INTO USERS (ID, Login_user) VALUES ('11111111-1111-1111-1111-111111111111', '������������ ������');
INSERT INTO USERS (Login_user, Password_user, Role_user) VALUES ('admin', 'kavOk72+FgAcqkWq0Mosqw==CABgMHN0asS1KfpQ5RHdUGZ7eCF6lFawC9nWJt9sWWY=', '7dcb0637-af2c-4ae2-acf0-8413fe455402');

CREATE TABLE PROJECT 
(ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_project VARCHAR (30),
Director_project UNIQUEIDENTIFIER FOREIGN KEY REFERENCES USERS(ID),
Description_project VARCHAR(200),
DateCreate_project DATETIME);

CREATE TABLE PROJECT_MEASURE 
(ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
ID_project UNIQUEIDENTIFIER FOREIGN KEY REFERENCES PROJECT(ID) ON DELETE CASCADE,
ID_measure UNIQUEIDENTIFIER FOREIGN KEY REFERENCES MEASURE(ID) ON DELETE CASCADE);

CREATE TABLE PROJECT_COMMAND
(ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
ID_project UNIQUEIDENTIFIER FOREIGN KEY REFERENCES PROJECT(ID) ON DELETE CASCADE,
ID_Command UNIQUEIDENTIFIER FOREIGN KEY REFERENCES PROGRAMMCOMMANDS(ID) ON DELETE CASCADE);

CREATE TABLE PROJECT_TELEMETRY
(ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
ID_project UNIQUEIDENTIFIER FOREIGN KEY REFERENCES PROJECT(ID) ON DELETE CASCADE,
ID_telemetry UNIQUEIDENTIFIER FOREIGN KEY REFERENCES TELEMETRY(ID) ON DELETE CASCADE);

CREATE TABLE PROJECT_DEVICE
(ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
ID_project UNIQUEIDENTIFIER FOREIGN KEY REFERENCES PROJECT(ID) ON DELETE CASCADE,
ID_device UNIQUEIDENTIFIER FOREIGN KEY REFERENCES DEVICES(ID) ON DELETE CASCADE);

CREATE TABLE PROJECT_INTERFACE
(ID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
ID_project UNIQUEIDENTIFIER FOREIGN KEY REFERENCES PROJECT(ID) ON DELETE CASCADE,
ID_interface UNIQUEIDENTIFIER FOREIGN KEY REFERENCES INTERFACES(ID) ON DELETE CASCADE);

----------------------------------------------------------
CREATE TRIGGER users_u ON USERS
AFTER UPDATE
AS BEGIN
	IF ((SELECT Login_user FROM deleted) != (SELECT Login_user FROM inserted))
	BEGIN
		PRINT '������ �������� �����'
		ROLLBACK TRANSACTION
	END
END

----------------------------------------------------------
CREATE TRIGGER comments_i ON COMMENTS
AFTER INSERT
AS BEGIN
	UPDATE COMMENTS 
	SET DateTime_comment = GETDATE() WHERE ID_comment = (SELECT ID_comment FROM inserted);
END

DROP TRIGGER comments_i

----------------------------------------------------------
CREATE TRIGGER project_i ON PROJECT
AFTER INSERT
AS BEGIN
	UPDATE PROJECT 
	SET DateCreate_project = GETDATE() WHERE ID_project = (SELECT ID_project FROM inserted);
END

----------------------------------------------------------
CREATE TRIGGER protocol_i ON PROTOCOL
AFTER INSERT
AS BEGIN
	UPDATE PROTOCOL 
	SET DateCreate_protocol = GETDATE() WHERE ID_protocol = (SELECT ID_protocol FROM inserted);
END

----------------------------------------------------------
CREATE TRIGGER measure_i ON MEASURE
AFTER INSERT
AS BEGIN
	UPDATE MEASURE 
	SET DateCreate_measure = GETDATE() WHERE ID_measure = (SELECT ID_measure FROM inserted);
END

----------------------------------------------------------
CREATE TRIGGER posts_d ON POSTS
INSTEAD OF DELETE 
AS BEGIN
	DECLARE @idpost UNIQUEIDENTIFIER = (SELECT ID_post FROM deleted);
	DECLARE @iduser UNIQUEIDENTIFIER = (SELECT ID_user FROM USERS WHERE Post_user = @idpost);

	UPDATE USERS SET Post_user = '00000000-0000-0000-0000-000000000000' WHERE ID_user = @iduser;
	DELETE POSTS WHERE ID_post = @idpost;
END

----------------------------------------------------------
CREATE TRIGGER roles_d ON ROLES
INSTEAD OF DELETE 
AS BEGIN
	DECLARE @idrole UNIQUEIDENTIFIER = (SELECT ID_role FROM deleted);
	DECLARE @iduser UNIQUEIDENTIFIER = (SELECT ID_user FROM USERS WHERE Role_user = @idrole);

	UPDATE USERS SET Role_user = '00000000-0000-0000-0000-000000000000' WHERE ID_user = @iduser;
	DELETE ROLES WHERE ID_role = @idrole;
END

----------------------------------------------------------
CREATE TRIGGER category_d ON CATEGORY
INSTEAD OF DELETE 
AS BEGIN
	DECLARE @idcategory UNIQUEIDENTIFIER = (SELECT ID_category FROM deleted);
	DECLARE @idproject UNIQUEIDENTIFIER = (SELECT ID_project FROM PROJECT WHERE Category_project = @idcategory);

	UPDATE PROJECT SET Category_project = '00000000-0000-0000-0000-000000000000' WHERE ID_project = @idproject;
	DELETE CATEGORY WHERE ID_category = @idcategory;
END

----------------------------------------------------------
CREATE TRIGGER users_d ON USERS
INSTEAD OF DELETE 
AS BEGIN
	DECLARE @iduser UNIQUEIDENTIFIER = (SELECT ID_user FROM deleted);
	DECLARE @idproject UNIQUEIDENTIFIER = (SELECT ID_project FROM PROJECT WHERE Director_project = @iduser);
	WHILE ((SELECT COUNT(ID_comment) FROM COMMENTS WHERE Author_comment = @iduser) != 0)
	BEGIN
		UPDATE PROJECT SET Director_project = '00000000-0000-0000-0000-000000000000' WHERE ID_project = @idproject;
		UPDATE COMMENTS SET Author_comment = '11111111-1111-1111-1111-111111111111' WHERE Author_comment = @iduser;
	END;
	DELETE USERS WHERE ID_user = @iduser;
END

DROP TRIGGER users_d

----------------------------------------------------------
CREATE TRIGGER brands_d ON BRANDS
INSTEAD OF DELETE 
AS BEGIN
	DECLARE @idbrand UNIQUEIDENTIFIER = (SELECT ID_brand FROM deleted);
	DECLARE @iddevice UNIQUEIDENTIFIER = (SELECT ID_device FROM DEVICES WHERE Brand_device = @idbrand);

	UPDATE DEVICES SET Brand_device = '00000000-0000-0000-0000-000000000000' WHERE ID_device = @iddevice;
	DELETE BRANDS WHERE ID_brand = @idbrand;
END

----------------------------------------------------------
CREATE TRIGGER typedev_d ON TYPEDEV
INSTEAD OF DELETE 
AS BEGIN
	DECLARE @idtypedev UNIQUEIDENTIFIER = (SELECT ID_typedev FROM deleted);
	DECLARE @iddevice UNIQUEIDENTIFIER = (SELECT ID_device FROM DEVICES WHERE Type_device = @idtypedev);

	UPDATE DEVICES SET Type_device = '00000000-0000-0000-0000-000000000000' WHERE ID_device = @iddevice;
	DELETE TYPEDEV WHERE ID_typedev = @idtypedev;
END

----------------------------------------------------------
CREATE TRIGGER typeinter_d ON TYPEINTER
INSTEAD OF DELETE 
AS BEGIN
	DECLARE @idtypeinter UNIQUEIDENTIFIER = (SELECT ID_typeinter FROM deleted);
	DECLARE @idinterface UNIQUEIDENTIFIER = (SELECT ID_interface FROM INTERFACES WHERE Type_interface = @idtypeinter);

	UPDATE INTERFACES SET Type_interface = '00000000-0000-0000-0000-000000000000' WHERE ID_interface = @idinterface;
	DELETE TYPEINTER WHERE ID_typeinter = @idtypeinter;
END

----------------------------------------------------------
CREATE TRIGGER typemeasure_d ON TYPEMEASURE
INSTEAD OF DELETE 
AS BEGIN
	DECLARE @idtypemeasure UNIQUEIDENTIFIER = (SELECT ID_typemeasure FROM deleted);
	DECLARE @idmeasure UNIQUEIDENTIFIER = (SELECT ID_measure FROM MEASURE WHERE Type_measure = @idtypemeasure);

	UPDATE MEASURE SET Type_measure = '00000000-0000-0000-0000-000000000000' WHERE ID_measure = @idmeasure;
	DELETE TYPEMEASURE WHERE ID_typemeasure = @idtypemeasure;
END

----------------------------------------------------------
CREATE TRIGGER interface_d ON INTERFACES
INSTEAD OF DELETE 
AS BEGIN
	DECLARE @idinterface UNIQUEIDENTIFIER = (SELECT ID_interface FROM deleted);
	DECLARE @idmeasure UNIQUEIDENTIFIER = (SELECT ID_measure FROM MEASURE WHERE Interface_measure = @idinterface);

	UPDATE MEASURE SET Interface_measure = '00000000-0000-0000-0000-000000000000' WHERE ID_measure = @idmeasure;
	DELETE INTERFACES WHERE ID_interface = @idinterface;
END

----------------------------------------------------------
CREATE TRIGGER protocol_d ON PROTOCOL
INSTEAD OF DELETE 
AS BEGIN
	DECLARE @idprotocol UNIQUEIDENTIFIER = (SELECT ID_protocol FROM deleted);
	DECLARE @idcomment UNIQUEIDENTIFIER;
	WHILE ((SELECT COUNT(*) FROM COMMENTS_PROTOCOL WHERE Protocol_comment_link = @idprotocol) > 0)
		BEGIN
			SET @idcomment = (SELECT TOP(1) Comment_link FROM COMMENTS_PROTOCOL WHERE Protocol_comment_link = @idprotocol );
			DELETE COMMENTS WHERE ID_comment = @idcomment;
		END;
	DELETE PROTOCOL WHERE ID_protocol = @idprotocol;
END

----------------------------------------------------------
CREATE TRIGGER devices_measure_d ON DEVICES_MEASURE
AFTER DELETE
AS BEGIN
	DECLARE @idmeas UNIQUEIDENTIFIER = (SELECT Measure_link FROM deleted);
	IF ((SELECT COUNT(*) FROM DEVICES_MEASURE WHERE Measure_link = @idmeas) = 0)
		BEGIN
			INSERT DEVICES_MEASURE (Measure_link, Device_link) VALUES (@idmeas, '00000000-0000-0000-0000-000000000000');
		END;
END

----------------------------------------------------------
CREATE TRIGGER project_protocol_d ON PROJECT_PROTOCOL
AFTER DELETE
AS BEGIN
	DECLARE @idproj UNIQUEIDENTIFIER = (SELECT Project_link FROM deleted);
	IF ((SELECT COUNT(*) FROM PROJECT_PROTOCOL WHERE Project_link = @idproj) = 0)
		BEGIN
			INSERT PROJECT_PROTOCOL (Project_link, Protocol_project_link) VALUES (@idproj, '00000000-0000-0000-0000-000000000000');
		END;
END

create login RSSadmin with password = '#Qteltn3', DEFAULT_DATABASE = master, CHECK_EXPIRATION = OFF, CHECK_POLICY = OFF;

create user RSSadmin for login RSSadmin
