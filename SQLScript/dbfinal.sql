CREATE DATABASE RSS;
USE RSS;

CREATE TABLE BRANDS 
(ID_brand UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_brand VARCHAR(40) UNIQUE);

INSERT INTO BRANDS VALUES ('00000000-0000-0000-0000-000000000000', '---');

CREATE TABLE TYPEDEV 
(ID_typedev UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_typedev VARCHAR(30) UNIQUE);

INSERT INTO TYPEDEV VALUES ('00000000-0000-0000-0000-000000000000', '---');

CREATE TABLE TYPEINTER 
(ID_typeinter UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_typeinter VARCHAR(30) UNIQUE);

INSERT INTO TYPEINTER VALUES ('00000000-0000-0000-0000-000000000000', '---');

CREATE TABLE INTERFACES
(ID_interface UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_interface VARCHAR (30),
IsReadyStatus_interface VARCHAR (30),
IsUsed_interface VARCHAR (30),
SelectedPort_interface VARCHAR (30),
Type_interface UNIQUEIDENTIFIER FOREIGN KEY REFERENCES TYPEINTER(ID_typeinter),
IpInput_interface VARCHAR (30),
ActualIp_interface VARCHAR (30));

CREATE TABLE DEVICES
(ID_device UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Interface_device UNIQUEIDENTIFIER FOREIGN KEY REFERENCES INTERFACES(ID_interface),
Brand_device UNIQUEIDENTIFIER FOREIGN KEY REFERENCES BRANDS(ID_brand),
Model_device VARCHAR (30),
Status_device VARCHAR (30),
IpInput_device VARCHAR (30),
ActualIp_device VARCHAR (30),
Port_device VARCHAR (30),
Type_device UNIQUEIDENTIFIER FOREIGN KEY REFERENCES TYPEDEV(ID_typedev),
Caption_device VARCHAR(100));

INSERT INTO DEVICES(ID_device, Model_device) VALUES ('00000000-0000-0000-0000-000000000000', '---');

CREATE TABLE TYPEMEASURE 
(ID_typemeasure UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_typemeasure VARCHAR (30) UNIQUE);

INSERT INTO TYPEMEASURE VALUES ('00000000-0000-0000-0000-000000000000', '---');

CREATE TABLE MEASURE
(ID_measure UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Group_measure VARCHAR (30),
Name_measure VARCHAR (30),
isCheck_measure VARCHAR (30),
Status_measure VARCHAR (30),
Type_measure UNIQUEIDENTIFIER FOREIGN KEY REFERENCES TYPEMEASURE(ID_typemeasure),
Manual_measure VARCHAR (30),
Interface_measure UNIQUEIDENTIFIER FOREIGN KEY REFERENCES INTERFACES(ID_interface),
DateCreate_measure DATETIME);

CREATE TABLE DEVICES_MEASURE
(ID_devmeas UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Device_link UNIQUEIDENTIFIER FOREIGN KEY REFERENCES DEVICES(ID_device) ON DELETE CASCADE,
Measure_link UNIQUEIDENTIFIER FOREIGN KEY REFERENCES MEASURE(ID_measure) ON DELETE CASCADE);

CREATE TABLE PROGRAMMCOMMANDS 
(ID_command UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Code_command VARCHAR (30),
Name_command VARCHAR (30),
Purpose_command VARCHAR(100),
Description_command VARCHAR(200),
Telemetry_command VARCHAR (30));

CREATE TABLE TELEMETRY
(ID_telemetry UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
LongName_telemetry VARCHAR (30),
ShortName_telemetry VARCHAR (30),
ByteNumber_telemetry INT,
StartBit_telemetry INT,
Lenght_telemetry INT,
PossibleValues_telemetry VARCHAR (30));

CREATE TABLE ROLES 
(ID_role UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_role VARCHAR (30) UNIQUE);

INSERT INTO ROLES VALUES ('00000000-0000-0000-0000-000000000000', '---');

CREATE TABLE CATEGORY
(ID_category UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_category VARCHAR (30) UNIQUE);

INSERT INTO CATEGORY VALUES ('00000000-0000-0000-0000-000000000000', '---');

CREATE TABLE POSTS
(ID_post UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_post VARCHAR(30) UNIQUE);

INSERT INTO POSTS VALUES ('00000000-0000-0000-0000-000000000000', '---');

CREATE TABLE USERS 
(ID_user UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_user VARCHAR (30),
Middlename_user VARCHAR (30),
Lastname_user VARCHAR (30),
Login_user VARCHAR(40) UNIQUE,
Post_user UNIQUEIDENTIFIER FOREIGN KEY REFERENCES POSTS(ID_post),
Role_user UNIQUEIDENTIFIER FOREIGN KEY REFERENCES ROLES(ID_role));

INSERT INTO USERS (ID_user, Middlename_user, Login_user) VALUES ('00000000-0000-0000-0000-000000000000', '---', '---');
INSERT INTO USERS (ID_user, Login_user) VALUES ('11111111-1111-1111-1111-111111111111', 'Пользователь удален');

CREATE TABLE COMMENTS
(ID_comment UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Text_comment VARCHAR(200),
Author_comment UNIQUEIDENTIFIER FOREIGN KEY REFERENCES USERS(ID_user),
DateTime_comment DATETIME);

CREATE TABLE PROJECT 
(ID_project UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_project VARCHAR (30),
Director_project UNIQUEIDENTIFIER FOREIGN KEY REFERENCES USERS(ID_user),
Category_project UNIQUEIDENTIFIER FOREIGN KEY REFERENCES CATEGORY(ID_category),
Description_project VARCHAR(200),
DateCreate_project DATETIME);

CREATE TABLE PROTOCOL
(ID_protocol UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Name_protocol VARCHAR (30),
DateCreate_protocol DATETIME);

INSERT INTO PROTOCOL (ID_protocol, Name_protocol) VALUES ('00000000-0000-0000-0000-000000000000', '---');

CREATE TABLE COMMENTS_PROTOCOL
(ID_commentprotocol UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Comment_link UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Comments(ID_comment) ON DELETE CASCADE,
Protocol_comment_link UNIQUEIDENTIFIER FOREIGN KEY REFERENCES PROTOCOL(ID_protocol) ON DELETE CASCADE);

CREATE TABLE PROJECT_PROTOCOL 
(ID_projprot UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Project_link UNIQUEIDENTIFIER FOREIGN KEY REFERENCES PROJECT(ID_project) ON DELETE CASCADE,
Protocol_project_link UNIQUEIDENTIFIER FOREIGN KEY REFERENCES PROTOCOL(ID_protocol) ON DELETE CASCADE);

CREATE TABLE PRCOMMANDS_PROTOCOL 
(ID_prcprot UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Command_link UNIQUEIDENTIFIER FOREIGN KEY REFERENCES PROGRAMMCOMMANDS(ID_command) ON DELETE CASCADE,
Protocol_command_link UNIQUEIDENTIFIER FOREIGN KEY REFERENCES PROTOCOL(ID_protocol) ON DELETE CASCADE);

CREATE TABLE TELEMETRY_PROTOCOL
(ID_telprot UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Telemetry_link UNIQUEIDENTIFIER FOREIGN KEY REFERENCES TELEMETRY(ID_telemetry) ON DELETE CASCADE,
Protocol_telemetry_link UNIQUEIDENTIFIER FOREIGN KEY REFERENCES PROTOCOL(ID_protocol) ON DELETE CASCADE);

CREATE TABLE MEASURE_PROTOCOL 
(ID_measprot UNIQUEIDENTIFIER PRIMARY KEY DEFAULT newsequentialid(),
Measure_link UNIQUEIDENTIFIER FOREIGN KEY REFERENCES MEASURE(ID_measure) ON DELETE CASCADE,
Protocol_measure_link UNIQUEIDENTIFIER FOREIGN KEY REFERENCES PROTOCOL(ID_protocol) ON DELETE CASCADE);

----------------------------------------------------------
CREATE TRIGGER users_u ON USERS
AFTER UPDATE
AS BEGIN
	IF ((SELECT Login_user FROM deleted) != (SELECT Login_user FROM inserted))
	BEGIN
		PRINT 'Нельзя изменить логин'
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


----------------------------------------------------------
----------------------------------------------------------
----------------------------------------------------------
----------------------------------------------------------
----------------------------------------------------------
CREATE PROC director_project_proc
@dirproject VARCHAR(50) = ''
AS BEGIN 
	SELECT ID_project as 'ID', 
	Name_project as 'Название проекта', 
	MiddleName_user as 'Руководитель проекта',
	Name_category as 'Категория проекта',
	Description_project as 'Описание проекта',
	DateCreate_project as 'Дата создания проекта'  
	FROM Project JOIN USERS ON ID_USER = Director_project 
	JOIN CATEGORY ON ID_category = Category_project 
	WHERE Director_project = (SELECT ID_user FROM USERS WHERE Login_user = @dirproject);
END

EXEC director_project_proc ''

----------------------------------------------------------

CREATE PROC telemetry_by_part_proc
@part VARCHAR(10) = ''
AS BEGIN
SELECT ID_telemetry as 'ID',
LongName_telemetry as 'Полное название', 
ShortName_telemetry as 'Короткое название',
ByteNumber_telemetry as 'Количество байт',
StartBit_telemetry as 'Первый бит телеметрии',
Lenght_telemetry as 'Длина телеметрии',
PossibleValues_telemetry as 'Возможные значения телеметрии' 
FROM TELEMETRY WHERE ShortName_telemetry LIKE @part
END

EXEC telemetry_by_part_proc 'Тел%'

----------------------------------------------------------
CREATE PROC boss_proc
AS BEGIN 
SELECT COUNT(Name_post) as 'Количество начальников в организации' 
FROM USERS JOIN POSTS ON ID_post = Post_user WHERE Name_post LIKE 'Началь%'
END

EXEC boss_proc 






