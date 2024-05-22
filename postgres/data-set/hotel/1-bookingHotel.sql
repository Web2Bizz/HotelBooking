--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-04-11 22:50:21

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16472)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 5002 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16483)
-- Name: booking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.booking (
    id_booking uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    id_guest uuid NOT NULL,
    id_room uuid NOT NULL,
    arrival_date date NOT NULL,
    departure_date date NOT NULL,
    count_adults integer NOT NULL,
    count_children integer NOT NULL,
    amount_paid real NOT NULL,
    id_rate uuid NOT NULL
);


ALTER TABLE public.booking OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16487)
-- Name: cancellationpolicy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cancellationpolicy (
    id_cancellation_policy uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    cancellation_policy character varying NOT NULL,
    description text,
    color character varying
);


ALTER TABLE public.cancellationpolicy OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16493)
-- Name: deal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deal (
    id_deal uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    deal_number integer NOT NULL,
    deal_name character varying NOT NULL,
    reservation_left integer NOT NULL,
    start_date date,
    end_date date,
    id_room_type uuid NOT NULL,
    id_status_deal uuid NOT NULL,
    discount integer NOT NULL,
    description text
);


ALTER TABLE public.deal OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16499)
-- Name: dealstatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dealstatus (
    id_status_deal uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    status_deal character varying NOT NULL,
    color character varying
);


ALTER TABLE public.dealstatus OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16505)
-- Name: employees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employees (
    id_employee uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    id_position uuid NOT NULL,
    hire_date date NOT NULL,
    salary real NOT NULL,
    phone_number character varying NOT NULL,
    email character varying,
    father_name character varying NOT NULL,
    photo bytea
);


ALTER TABLE public.employees OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16511)
-- Name: guests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.guests (
    id_guest uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    number_guest integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    father_name character varying NOT NULL,
    phone_number character varying NOT NULL,
    id_status_guest uuid DEFAULT 'c5418723-6d2a-420d-93e4-9d896cecf452'::uuid NOT NULL,
    id_room uuid NOT NULL,
    email character varying
);


ALTER TABLE public.guests OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 32991)
-- Name: hotelproperties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hotelproperties (
    id_hotel_properties uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    hotel_name character varying NOT NULL,
    hotel_logo text NOT NULL,
    hotel_country character varying NOT NULL,
    hotel_region character varying NOT NULL,
    hotel_city character varying NOT NULL,
    hotel_street character varying NOT NULL,
    hotel_number_house character varying NOT NULL,
    hotel_count_floor integer NOT NULL,
    hotel_count_room integer NOT NULL,
    contact_email character varying NOT NULL,
    contact_number_phone character varying NOT NULL,
    owner_name character varying NOT NULL,
    owner_number_phone character varying NOT NULL,
    owner_email character varying NOT NULL,
    id_personal_data_storage_policy uuid NOT NULL
);


ALTER TABLE public.hotelproperties OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 33002)
-- Name: personaldatastoragepolicy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personaldatastoragepolicy (
    id_personal_data_storage_policy uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    personal_data_storage_policy character varying NOT NULL
);


ALTER TABLE public.personaldatastoragepolicy OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16519)
-- Name: positions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.positions (
    id_position uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "position" character varying NOT NULL
);


ALTER TABLE public.positions OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16525)
-- Name: rate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rate (
    id_rate uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    id_room_type uuid NOT NULL,
    id_cancellation_policy uuid NOT NULL,
    id_deal uuid,
    rate real NOT NULL
);


ALTER TABLE public.rate OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 24800)
-- Name: repairroom; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.repairroom (
    id_repair uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    id_room uuid NOT NULL,
    name_work character varying NOT NULL,
    description_work character varying,
    start_date date NOT NULL,
    end_date date NOT NULL,
    id_status_repair uuid DEFAULT '4b89fc86-1dba-4459-9c78-f4cad967cd70'::uuid NOT NULL,
    closeroom boolean DEFAULT false NOT NULL
);


ALTER TABLE public.repairroom OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16529)
-- Name: room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room (
    id_room uuid NOT NULL,
    room_number integer NOT NULL,
    room_floor integer NOT NULL,
    id_status uuid NOT NULL,
    id_room_type uuid NOT NULL,
    facility character varying[],
    id_room_service_status uuid DEFAULT '8c18094a-7f8b-4ad8-8023-e4419371c3b5'::uuid NOT NULL,
    id_repair uuid[]
);


ALTER TABLE public.room OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16534)
-- Name: room_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.room_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.room_seq OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16535)
-- Name: roomfacility; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roomfacility (
    id_facility uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    facility character varying(50) NOT NULL
);


ALTER TABLE public.roomfacility OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16553)
-- Name: roomservicestatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roomservicestatus (
    id_status_guest_room uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    status_guest_room character varying NOT NULL,
    color_sgr character varying
);


ALTER TABLE public.roomservicestatus OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16539)
-- Name: roomstatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roomstatus (
    id_status uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    status character varying(50) NOT NULL,
    color character varying(30)
);


ALTER TABLE public.roomstatus OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16543)
-- Name: roomtype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roomtype (
    id_room_type uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    room_type character varying(20) NOT NULL
);


ALTER TABLE public.roomtype OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16547)
-- Name: statusguest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.statusguest (
    id_status_guest uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    status_guest character varying NOT NULL,
    color_sg character varying
);


ALTER TABLE public.statusguest OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 24808)
-- Name: statusrepair; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.statusrepair (
    id_status_repair uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    status_repair character varying NOT NULL,
    color character varying NOT NULL
);


ALTER TABLE public.statusrepair OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16559)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id_user uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    login character varying NOT NULL,
    password character varying NOT NULL,
    role character varying DEFAULT 'user'::character varying NOT NULL,
    email character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4977 (class 0 OID 16483)
-- Dependencies: 216
-- Data for Name: booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.booking (id_booking, id_guest, id_room, arrival_date, departure_date, count_adults, count_children, amount_paid, id_rate) FROM stdin;
224afb0f-fbb8-4436-90f0-146b1ceb54b5	99bfdb2a-467e-40c3-80c5-3aabcb8eca39	3ba39977-c185-49d1-be03-5187699c0e68	2023-11-22	2023-11-24	1	0	5940	105a19be-a5f4-4f08-8060-65ab7a4876ef
96d44a55-6c44-4fd2-a1f8-51c1cad7c9b7	ee96d11b-565f-4af5-a5b4-5076997239d1	37168b38-1130-4765-9a92-2548d147e81c	2023-11-08	2023-11-16	1	3	24000	4d6b2160-0de5-477f-9253-f98e5845a800
985f9189-6db3-4c71-8517-e586ea7557a3	8f69e875-c781-42e8-aa0a-f5ef31f5b6a9	0637ac9b-79cf-4421-b072-67f25cf24255	2023-11-17	2023-12-08	2	0	94500	02bf5ca8-4f90-415a-bf47-f70cb6c0c07a
f37db82e-116e-49ba-9933-5792dd726d2c	b392fcda-5f08-420e-b578-49070b2355e2	0533f703-7b72-4a19-822c-c8fb34129e95	2023-11-26	2023-12-08	2	0	72923.52	4d6b2160-0de5-477f-9253-f98e5845a800
fe882ee2-4092-4bbe-ab05-fde3fe5f8468	c92225cc-2ea5-4281-aa87-e23d56e76129	24844fad-d973-4859-95e3-77704ccef537	2023-11-22	2023-12-01	1	0	26730	105a19be-a5f4-4f08-8060-65ab7a4876ef
4a43c0f2-8203-4d98-aa14-a4c3e96b3b62	babc8547-4d03-406b-b387-7818d7d837c5	44b93340-63a0-40ca-90c0-9f9205ab01ff	2023-11-01	2023-12-08	2	0	109890	88e00426-8016-41a8-82fe-2da33b7e8e2e
2484be30-8ad8-4a22-b99b-1df344204ca4	7bdfd671-ef73-4395-b26c-43ef35878d48	0a41d70c-7a32-413f-b647-a3cbe32d0021	2024-03-14	2024-03-31	2	1	51000	8ac2b833-8451-4dd3-a510-748c456b441f
30c4d18e-8e6f-4953-a1b0-b1be515af956	3884fc91-a157-4427-8309-62e0f6d14469	24844fad-d973-4859-95e3-77704ccef537	2024-03-07	2024-03-10	1	0	12150	1efe2c71-c5a5-4b14-8f24-4f62d633218d
8cafee0e-3e53-4706-9685-323b04b8bf9a	ebde3f4a-cbf8-467d-b397-9e8683e87c0c	37895c8c-709e-4e21-9f36-7918f0bd2155	2024-03-06	2024-03-09	1	0	8910	88e00426-8016-41a8-82fe-2da33b7e8e2e
\.


--
-- TOC entry 4978 (class 0 OID 16487)
-- Dependencies: 217
-- Data for Name: cancellationpolicy; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cancellationpolicy (id_cancellation_policy, cancellation_policy, description, color) FROM stdin;
12795923-09cf-4cd1-95fb-9e4421405b62	Не возмещаеться	В случае не приезда гостя, договор не аннулируеться, даже если гость не явился в заявленные сроки. Денежные средства взымаються столько, сколько написано в договоре.	orange
80e5070d-366a-41ed-8fb1-6e96815499ae	Строгая	Если гость опаздывает в отель более чем на сутки, влечет за собой полное аннулирование договора о предоставлении услуг. При этом гость обязан оплатить стоимость номера , в размере цены за стуки проживания.	blue
bd65c688-c013-4b0d-8370-a46d89b6725e	Гибкая	Бронь действует только на запланированный день, до определенного времени, заезда гостя. В случае не приезда, договор аннулируеться. Денежная компенсация не взымается.	green
\.


--
-- TOC entry 4979 (class 0 OID 16493)
-- Dependencies: 218
-- Data for Name: deal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deal (id_deal, deal_number, deal_name, reservation_left, start_date, end_date, id_room_type, id_status_deal, discount, description) FROM stdin;
be8722d4-0b62-4a5e-957b-cccebfd916b3	1033	qwerty23	34	2023-10-11	2023-11-02	34b88687-dac5-40ac-9bf5-27e83ae1d590	afa52a7f-4b91-4637-bec1-7a4fe1ae871e	34	gfd
b22120b2-fe81-40a5-a019-c7ce2641ab0a	3785	Hello	23	2023-10-05	2023-10-31	87defdd3-016b-450f-8155-bfd43d8a2edf	214055b0-a87c-4a35-b280-875ddf4ec70b	23	Hello deal
81fcd149-b73c-45b8-8f5c-939b3cd6ff3c	1004	Helding	23	2023-10-11	2023-10-29	87defdd3-016b-450f-8155-bfd43d8a2edf	46400a9d-98e3-45ae-ac79-847aa8d771c3	24	qwerty123123123
49e600a9-fd13-497e-aca6-544d666a230b	3254	Распродажа на все	100	2023-11-08	2023-11-30	9a61965b-6d2d-471d-945b-d013ba8e5784	214055b0-a87c-4a35-b280-875ddf4ec70b	10	Акция на все типы комнат
a5735845-9847-44d9-b089-18480678725f	3255	Распродажа на все №2	100	2023-11-08	2023-11-30	7d500222-3191-46f5-9978-e35e67624a14	214055b0-a87c-4a35-b280-875ddf4ec70b	10	Акция на все типы комнат
e8ba64ac-4f71-4c65-89eb-62ec0b71eb30	3256	Распродажа на все №3	100	2023-11-08	2023-11-30	34b88687-dac5-40ac-9bf5-27e83ae1d590	214055b0-a87c-4a35-b280-875ddf4ec70b	10	Акция на все типы комнат
718251a8-0f45-4445-b443-ac2715e9b679	3257	Распродажа на все №4	100	2023-11-08	2023-11-30	87defdd3-016b-450f-8155-bfd43d8a2edf	214055b0-a87c-4a35-b280-875ddf4ec70b	10	Акция на все типы комнат
718a9bc7-865a-47c2-b701-72971f87c3a5	2345	Вип всем	50	2023-10-30	2023-12-29	87defdd3-016b-450f-8155-bfd43d8a2edf	214055b0-a87c-4a35-b280-875ddf4ec70b	10	Акция на все комнаты VIP
381c280c-4ed4-4d80-b613-9cfcde22a09f	4231	Дорогу молодым	70	2023-10-30	2023-12-10	34b88687-dac5-40ac-9bf5-27e83ae1d590	46400a9d-98e3-45ae-ac79-847aa8d771c3	30	Акция предоставляется молодым парам
1d7be651-a19d-4a77-ba74-16bb8331c22f	6789	Новогодняя акция	55	2023-11-29	2023-12-29	87defdd3-016b-450f-8155-bfd43d8a2edf	37fd4972-180f-4690-9619-28b2352e1592	20	Новогодняя акция
09af2ca3-98d6-4960-9ad5-4e194a5f31e9	8578	Еще одна акция	40	2023-11-08	2023-12-01	9a61965b-6d2d-471d-945b-d013ba8e5784	afa52a7f-4b91-4637-bec1-7a4fe1ae871e	50	Описание
\.


--
-- TOC entry 4980 (class 0 OID 16499)
-- Dependencies: 219
-- Data for Name: dealstatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dealstatus (id_status_deal, status_deal, color) FROM stdin;
d5e72c04-9322-446b-8f88-3f938752ead6	Закончилась	red
46400a9d-98e3-45ae-ac79-847aa8d771c3	Новая	green
214055b0-a87c-4a35-b280-875ddf4ec70b	Активная	blue
afa52a7f-4b91-4637-bec1-7a4fe1ae871e	Максимум	red
37fd4972-180f-4690-9619-28b2352e1592	Скоро	orange
9a57ce8a-72f9-4455-b005-ef4c405b3e98	Неактивно	\N
\.


--
-- TOC entry 4981 (class 0 OID 16505)
-- Dependencies: 220
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employees (id_employee, first_name, last_name, id_position, hire_date, salary, phone_number, email, father_name, photo) FROM stdin;
\.


--
-- TOC entry 4982 (class 0 OID 16511)
-- Dependencies: 221
-- Data for Name: guests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.guests (id_guest, number_guest, first_name, last_name, father_name, phone_number, id_status_guest, id_room, email) FROM stdin;
1471b64b-6d91-4e97-b3d4-8c1987041d23	4228	Виктор	Викторов	Викторович	+745873465873	c5418723-6d2a-420d-93e4-9d896cecf452	0a41d70c-7a32-413f-b647-a3cbe32d0021	\N
2decaa28-db40-4264-be4e-2d9a8c4ddaa0	8305	Виктор	Виктор	Виктор	+73453453454355	c5418723-6d2a-420d-93e4-9d896cecf452	0a41d70c-7a32-413f-b647-a3cbe32d0021	\N
f060a41e-de7c-4d57-bf29-a9f59d5228a9	5081	Виктор	Виктор	Виктор	+73543534534	c5418723-6d2a-420d-93e4-9d896cecf452	0a41d70c-7a32-413f-b647-a3cbe32d0021	\N
ee96d11b-565f-4af5-a5b4-5076997239d1	7950	Виктор	Антипов	Александрович	+79074563443	de86a967-0104-4c67-80be-8b119d34d9e0	37168b38-1130-4765-9a92-2548d147e81c	temp@mail.ru
1c7179f7-1d95-4e87-9ed5-dc2c46e374e4	4948	Алексей	Пупок	Пуповины	+79370384017	c5418723-6d2a-420d-93e4-9d896cecf452	0533f703-7b72-4a19-822c-c8fb34129e95	\N
b392fcda-5f08-420e-b578-49070b2355e2	2044	Алексей	Алексей	Алексей	+7890980980809	c5418723-6d2a-420d-93e4-9d896cecf452	0533f703-7b72-4a19-822c-c8fb34129e95	\N
3a0ae11d-e15c-47c8-979c-ac15b419750e	3974	Виктор	Виктор	Виктор	+7345345345345	c5418723-6d2a-420d-93e4-9d896cecf452	0a41d70c-7a32-413f-b647-a3cbe32d0021	\N
3fce711d-3372-42e3-a620-38256f2eff94	4914	Виктор	Викторов	Викторович	+73254353454335	c5418723-6d2a-420d-93e4-9d896cecf452	0a41d70c-7a32-413f-b647-a3cbe32d0021	\N
00eaf241-23e7-4fec-95b7-c17b5affc302	3837	Михаил	Медведев	Федосович	+78904563445	c5418723-6d2a-420d-93e4-9d896cecf452	0533f703-7b72-4a19-822c-c8fb34129e95	misha.m@yandex.ru
6a103142-5f76-4d8b-9d66-a614d18a5554	9137	Виктор	Виктор	Виктор	+7345656456	c5418723-6d2a-420d-93e4-9d896cecf452	0a41d70c-7a32-413f-b647-a3cbe32d0021	\N
81440b15-a52f-4180-8dd2-041f99d6a682	6626	Виктор	Виктор	Виктор	+73456456556	c5418723-6d2a-420d-93e4-9d896cecf452	3ba39977-c185-49d1-be03-5187699c0e68	\N
8f69e875-c781-42e8-aa0a-f5ef31f5b6a9	1462	Василиса	Морозова	Александровна	+790867886687	de86a967-0104-4c67-80be-8b119d34d9e0	0637ac9b-79cf-4421-b072-67f25cf24255	\N
57bbbc57-4e75-4b5b-8428-f0af6718a722	3090	Алексей	Алексеев	Алексеевич	+77089783456	de86a967-0104-4c67-80be-8b119d34d9e0	37895c8c-709e-4e21-9f36-7918f0bd2155	\N
7bdfd671-ef73-4395-b26c-43ef35878d48	1624	Виктор	Милонов	Степанович	+79962866102	700b098c-cbd1-4616-9c3f-bc82ba24b281	0a41d70c-7a32-413f-b647-a3cbe32d0021	juliennestupid@jcnorris.com
c92225cc-2ea5-4281-aa87-e23d56e76129	8481	Волков	Волков	Волков	+79370384017	de86a967-0104-4c67-80be-8b119d34d9e0	24844fad-d973-4859-95e3-77704ccef537	\N
fe7b0985-e3cf-41fb-9d82-08e673ff1761	4254	s	s	s	+79084880116	c5418723-6d2a-420d-93e4-9d896cecf452	0637ac9b-79cf-4421-b072-67f25cf24255	s@s.com
3884fc91-a157-4427-8309-62e0f6d14469	5372	Степан	Фидотов	Сергеевич	+79962866102	de86a967-0104-4c67-80be-8b119d34d9e0	24844fad-d973-4859-95e3-77704ccef537	dionism8@gmail.com
99bfdb2a-467e-40c3-80c5-3aabcb8eca39	8054	Виктор	Наумов	Олегович	+77687687689	de86a967-0104-4c67-80be-8b119d34d9e0	3ba39977-c185-49d1-be03-5187699c0e68	\N
babc8547-4d03-406b-b387-7818d7d837c5	8702	Михаил	Белов	Михаилович	+78094564556	de86a967-0104-4c67-80be-8b119d34d9e0	44b93340-63a0-40ca-90c0-9f9205ab01ff	misha.b@gmail.com
49a88797-6b14-42de-a1c8-071e0dd15caf	6335	d	d	d	+72	700b098c-cbd1-4616-9c3f-bc82ba24b281	24844fad-d973-4859-95e3-77704ccef537	dionism8@gmail.com
ebde3f4a-cbf8-467d-b397-9e8683e87c0c	2959	r	r	r	+79084880116	de86a967-0104-4c67-80be-8b119d34d9e0	37895c8c-709e-4e21-9f36-7918f0bd2155	r@r.com
\.


--
-- TOC entry 4995 (class 0 OID 32991)
-- Dependencies: 234
-- Data for Name: hotelproperties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hotelproperties (id_hotel_properties, hotel_name, hotel_logo, hotel_country, hotel_region, hotel_city, hotel_street, hotel_number_house, hotel_count_floor, hotel_count_room, contact_email, contact_number_phone, owner_name, owner_number_phone, owner_email, id_personal_data_storage_policy) FROM stdin;
cb100e8c-0c73-42cc-a701-7870bfc3f5d1	Не сочный отель	data:image/png;base64,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	Россия	Брянская область	Брянск	Октяборьская	2	4	100	lamurka1337@yandex.ru	+79084880116	Мясников Денис Сергеевич	+79084880116	lamurka1337@yandex.ru	90a83808-4fd9-417e-8f28-3c6c62fb10ec
\.


--
-- TOC entry 4996 (class 0 OID 33002)
-- Dependencies: 235
-- Data for Name: personaldatastoragepolicy; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personaldatastoragepolicy (id_personal_data_storage_policy, personal_data_storage_policy) FROM stdin;
ba1ca926-98ff-43a5-9593-f7a844daa01e	Бесконечно
fca278a2-02c9-41db-895a-ca4e951d8e68	Один год
90a83808-4fd9-417e-8f28-3c6c62fb10ec	Неделя
b3f395c1-7e30-4dbc-ae00-a9df0f0f1759	Удаление после выезда
\.


--
-- TOC entry 4983 (class 0 OID 16519)
-- Dependencies: 222
-- Data for Name: positions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.positions (id_position, "position") FROM stdin;
1b20ca72-2c1b-4f75-9951-9048ef2137a4	Портье
fdd2a037-c973-453f-b8da-e3a5ac94b578	Официант
1d87f4c0-5085-471f-b900-538fa06fc52e	Повар
675ca0c9-883b-407b-aeb3-a8f2cc11f564	Горничный
ce451085-ff38-44ee-9250-852ad7bd7794	Ресепшн
25a21f09-b937-4f8d-b015-44e6d7db1e58	Администратор
fa82a91b-465c-4da7-8b8e-328b9166e66a	Технический персонал
\.


--
-- TOC entry 4984 (class 0 OID 16525)
-- Dependencies: 223
-- Data for Name: rate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rate (id_rate, id_room_type, id_cancellation_policy, id_deal, rate) FROM stdin;
f8835666-c616-47b3-b43a-24423a2961be	34b88687-dac5-40ac-9bf5-27e83ae1d590	80e5070d-366a-41ed-8fb1-6e96815499ae	\N	4500
8ac2b833-8451-4dd3-a510-748c456b441f	7d500222-3191-46f5-9978-e35e67624a14	80e5070d-366a-41ed-8fb1-6e96815499ae	\N	3000
fc755bd0-ff71-4d3a-84d8-618dc899ffa8	9a61965b-6d2d-471d-945b-d013ba8e5784	80e5070d-366a-41ed-8fb1-6e96815499ae	\N	5000
88e00426-8016-41a8-82fe-2da33b7e8e2e	34b88687-dac5-40ac-9bf5-27e83ae1d590	80e5070d-366a-41ed-8fb1-6e96815499ae	be8722d4-0b62-4a5e-957b-cccebfd916b3	4500
14849d30-9bf2-4294-9e94-5303f7c1c2e1	9a61965b-6d2d-471d-945b-d013ba8e5784	bd65c688-c013-4b0d-8370-a46d89b6725e	49e600a9-fd13-497e-aca6-544d666a230b	5000
1efe2c71-c5a5-4b14-8f24-4f62d633218d	34b88687-dac5-40ac-9bf5-27e83ae1d590	bd65c688-c013-4b0d-8370-a46d89b6725e	e8ba64ac-4f71-4c65-89eb-62ec0b71eb30	4500
02bf5ca8-4f90-415a-bf47-f70cb6c0c07a	87defdd3-016b-450f-8155-bfd43d8a2edf	12795923-09cf-4cd1-95fb-9e4421405b62	81fcd149-b73c-45b8-8f5c-939b3cd6ff3c	5879
25d43f75-de54-467e-bdfa-f5c77e2825b1	87defdd3-016b-450f-8155-bfd43d8a2edf	bd65c688-c013-4b0d-8370-a46d89b6725e	1d7be651-a19d-4a77-ba74-16bb8331c22f	5879
b55be7c7-9acf-46e3-9481-d8b988df036d	87defdd3-016b-450f-8155-bfd43d8a2edf	bd65c688-c013-4b0d-8370-a46d89b6725e	718251a8-0f45-4445-b443-ac2715e9b679	5879
105a19be-a5f4-4f08-8060-65ab7a4876ef	87defdd3-016b-450f-8155-bfd43d8a2edf	bd65c688-c013-4b0d-8370-a46d89b6725e	718a9bc7-865a-47c2-b701-72971f87c3a5	5879
30ab63c4-1b9b-4fe7-806f-237740a7b2f9	87defdd3-016b-450f-8155-bfd43d8a2edf	bd65c688-c013-4b0d-8370-a46d89b6725e	b22120b2-fe81-40a5-a019-c7ce2641ab0a	5879
4d6b2160-0de5-477f-9253-f98e5845a800	87defdd3-016b-450f-8155-bfd43d8a2edf	12795923-09cf-4cd1-95fb-9e4421405b62	\N	5879
\.


--
-- TOC entry 4993 (class 0 OID 24800)
-- Dependencies: 232
-- Data for Name: repairroom; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.repairroom (id_repair, id_room, name_work, description_work, start_date, end_date, id_status_repair, closeroom) FROM stdin;
934902e8-a189-4e09-a01b-cbde11d8efa8	0a41d70c-7a32-413f-b647-a3cbe32d0021	Ремонт двери	Скрипит дверь	2024-03-18	2024-03-19	4b89fc86-1dba-4459-9c78-f4cad967cd70	f
6dc16b28-378e-4ea2-b31d-18ae0ea5859d	0637ac9b-79cf-4421-b072-67f25cf24255	Ремонт двери	Починить ручку, дверь не закрывается 	2024-03-15	2024-03-16	dce20919-ca67-483c-81d8-262d133311a6	f
9c79d8c6-5f67-4e98-8576-fb3c0066cb28	0637ac9b-79cf-4421-b072-67f25cf24255	Ремонт крана	Кран протекает 	2024-03-15	2024-03-16	68f08224-fc5a-4f75-8e4d-12c0279f2527	f
\.


--
-- TOC entry 4985 (class 0 OID 16529)
-- Dependencies: 224
-- Data for Name: room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room (id_room, room_number, room_floor, id_status, id_room_type, facility, id_room_service_status, id_repair) FROM stdin;
1281db3f-669d-487f-85b5-de0b9d6e553c	543	5	b4cc08c0-0c4b-4d81-ad4e-475e816d08e6	9a61965b-6d2d-471d-945b-d013ba8e5784	{Полотенца,Гардероб,Кухня}	2e74346c-439f-4c06-9fd8-428a9abbcc97	{8cbbc33f-efaf-47ee-a84f-7097af580507}
10bdd343-a09d-4878-8c51-901389b45b6b	123	1	b4cc08c0-0c4b-4d81-ad4e-475e816d08e6	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Полотенца,Гардероб,Кухня,Холодильник,Туалет}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	{dc2e7c10-0db7-43ab-9c9b-7c3cd26f0dca}
3c654150-31b7-446c-838a-381f0706c43e	675	3	c6d79c91-1ffa-4cd2-a1d2-d352914e82e2	7d500222-3191-46f5-9978-e35e67624a14	{Гардероб,Кухня,Вайфай,Холодильник,Ванна}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
0d4b2728-540f-464e-bc83-93016e8a99b6	421	4	b4cc08c0-0c4b-4d81-ad4e-475e816d08e6	9a61965b-6d2d-471d-945b-d013ba8e5784	{Телевизор,Полотенца,Гардероб,Кухня,Холодильник,Туалет}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	{26ac83fc-ec5e-4006-adba-82d321832d48}
0637ac9b-79cf-4421-b072-67f25cf24255	278	5	024e26c7-5e33-4f35-a88e-e6f5c9322e02	9a61965b-6d2d-471d-945b-d013ba8e5784	{Телевизор,Полотенца,Гардероб,Кухня,Холодильник,Туалет}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	{6dc16b28-378e-4ea2-b31d-18ae0ea5859d,9c79d8c6-5f67-4e98-8576-fb3c0066cb28,f63a8e90-c79b-4472-a2fd-83712a011b56,559efa78-78c1-41d1-b8cf-1514d5af6bc9,35a330b0-efeb-4c81-8c23-4b8b8140729b,402ac9f5-3564-4b1d-bbb1-7fc983f650fa,6b416c6c-4a6b-4059-a2d9-cba038cba03c}
11145a82-2400-4896-baa0-a0ab78ad2413	125	1	024e26c7-5e33-4f35-a88e-e6f5c9322e02	87defdd3-016b-450f-8155-bfd43d8a2edf	{Телевизор,Полотенца,Гардероб}	2e74346c-439f-4c06-9fd8-428a9abbcc97	{464d0262-c8d4-4450-9b93-91bda99c3f2c}
1d6d80c0-5661-4ded-aae4-441bfe12f063	213	5	024e26c7-5e33-4f35-a88e-e6f5c9322e02	9a61965b-6d2d-471d-945b-d013ba8e5784	{Полотенца,Гардероб,Кухня}	2e74346c-439f-4c06-9fd8-428a9abbcc97	{54ce8c7b-16a9-4d39-bcfd-2984aba487b3}
0a41d70c-7a32-413f-b647-a3cbe32d0021	517	2	024e26c7-5e33-4f35-a88e-e6f5c9322e02	7d500222-3191-46f5-9978-e35e67624a14	{Ванна,Полотенца,Гардероб,Кухня,Тапочки,Вайфай}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	{934902e8-a189-4e09-a01b-cbde11d8efa8,09124232-7526-42ef-be55-d964c9076d2f}
0bb547be-92ef-4dfb-a136-b364693bc48c	281	2	024e26c7-5e33-4f35-a88e-e6f5c9322e02	7d500222-3191-46f5-9978-e35e67624a14	{Ванна,Полотенца,Гардероб,Кухня,Тапочки,Вайфай}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	{39306d62-7301-4668-a310-876091396a0e}
209af2be-f066-4817-90e2-ce0df1ac026a	654	5	024e26c7-5e33-4f35-a88e-e6f5c9322e02	9a61965b-6d2d-471d-945b-d013ba8e5784	{Полотенца,Гардероб,Кухня}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
24844fad-d973-4859-95e3-77704ccef537	653	5	024e26c7-5e33-4f35-a88e-e6f5c9322e02	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Кондиционер,Полотенца,Гардероб,Кухня}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
26f951ec-0d7d-4a6f-9539-fc19c320104e	345	2	024e26c7-5e33-4f35-a88e-e6f5c9322e02	87defdd3-016b-450f-8155-bfd43d8a2edf	{Полотенца,Гардероб,Кухня,Холодильник,Туалет}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
2790a438-a84a-4d49-805d-beeaa600d643	469	1	024e26c7-5e33-4f35-a88e-e6f5c9322e02	87defdd3-016b-450f-8155-bfd43d8a2edf	{Полотенца,Гардероб,Кухня,Холодильник,Туалет,Ванна,Телевизор,Кондиционер,Тапочки,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
37168b38-1130-4765-9a92-2548d147e81c	234	3	024e26c7-5e33-4f35-a88e-e6f5c9322e02	7d500222-3191-46f5-9978-e35e67624a14	{Полотенца,Гардероб,Кухня,Вайфай,Холодильник}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
37895c8c-709e-4e21-9f36-7918f0bd2155	122	2	91128392-8f10-4cde-9684-0148536f9a1b	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Кухня,Ванна,Холодильник}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
3ba39977-c185-49d1-be03-5187699c0e68	205	5	024e26c7-5e33-4f35-a88e-e6f5c9322e02	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Кондиционер,Полотенца,Гардероб,Кухня}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
3bba0cb1-121c-4eb5-a688-87f080df7557	134	1	024e26c7-5e33-4f35-a88e-e6f5c9322e02	87defdd3-016b-450f-8155-bfd43d8a2edf	{Полотенца,Гардероб,Кухня,Холодильник,Туалет,Ванна,Телевизор,Кондиционер,Тапочки,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
3e0779a4-fcea-4ccf-a1fa-a9e0e3a6e39e	567	1	024e26c7-5e33-4f35-a88e-e6f5c9322e02	87defdd3-016b-450f-8155-bfd43d8a2edf	{Полотенца,Гардероб,Кухня,Холодильник,Туалет,Ванна,Телевизор,Кондиционер,Тапочки,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
3f1fbfdf-46a6-4d64-a51b-dd235f274ba4	764	1	024e26c7-5e33-4f35-a88e-e6f5c9322e02	87defdd3-016b-450f-8155-bfd43d8a2edf	{Полотенца,Гардероб,Кухня,Холодильник,Туалет,Ванна,Телевизор,Кондиционер,Тапочки,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
40cd3bdb-5763-464f-80a3-a25f7e574026	112	1	5e6c8c25-5492-447c-9c2b-eb1fe1a2a208	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Тапочки,Вайфай,Холодильник,Ванна}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
43f9f44a-f64c-4130-80e2-42f0a1efa8f3	312	5	024e26c7-5e33-4f35-a88e-e6f5c9322e02	9a61965b-6d2d-471d-945b-d013ba8e5784	{Полотенца,Гардероб,Кухня}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
44b93340-63a0-40ca-90c0-9f9205ab01ff	105	5	024e26c7-5e33-4f35-a88e-e6f5c9322e02	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Кухня,Холодильник}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
4726f73d-d607-4304-8bbf-64a613a901bf	761	2	024e26c7-5e33-4f35-a88e-e6f5c9322e02	7d500222-3191-46f5-9978-e35e67624a14	{Ванна,Полотенца,Гардероб,Кухня,Тапочки,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
488e4aeb-abde-423a-88f5-4ea5f34ec80b	561	1	91128392-8f10-4cde-9684-0148536f9a1b	87defdd3-016b-450f-8155-bfd43d8a2edf	{Вайфай,Ванна,Холодильник}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
5a8953af-68ae-49ed-bb5a-0b12d361a744	108	1	024e26c7-5e33-4f35-a88e-e6f5c9322e02	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Гардероб,Кухня,Туалет,Кондиционер,Вайфай,Ванна}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
5ac8ce77-07e6-442e-bc63-f0f71f84eb1d	101	1	5e6c8c25-5492-447c-9c2b-eb1fe1a2a208	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Вайфай,Холодильник,Ванна}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
6475cb5b-b0df-4ed0-a901-45945591420c	665	5	024e26c7-5e33-4f35-a88e-e6f5c9322e02	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Полотенца,Кухня,Кондиционер,Тапочки,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
67367d88-5417-45fd-949f-9ef9669f1a8a	943	5	024e26c7-5e33-4f35-a88e-e6f5c9322e02	7d500222-3191-46f5-9978-e35e67624a14	{Вайфай,Тапочки,Телевизор,Полотенца,Гардероб}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
67a4d7fa-61aa-4f6b-abd6-f02e55b24704	818	2	024e26c7-5e33-4f35-a88e-e6f5c9322e02	7d500222-3191-46f5-9978-e35e67624a14	{Ванна,Полотенца,Гардероб,Кухня,Тапочки,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
67c77768-0255-4137-802d-b28bd23dc582	110	1	024e26c7-5e33-4f35-a88e-e6f5c9322e02	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Ванна,Холодильник}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
75aee1a5-42b4-490f-b920-1b36f66a0d54	106	3	c6d79c91-1ffa-4cd2-a1d2-d352914e82e2	87defdd3-016b-450f-8155-bfd43d8a2edf	{Туалет,Тапочки,Кондиционер,Вайфай,Холодильник,Ванна}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
7e42114a-cb9a-4b93-b178-570abf7e6e23	934	1	024e26c7-5e33-4f35-a88e-e6f5c9322e02	87defdd3-016b-450f-8155-bfd43d8a2edf	{Полотенца,Гардероб,Кухня,Холодильник,Туалет,Ванна,Телевизор,Кондиционер,Тапочки,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
808ca29e-b5a7-43fe-a47c-a0d55f2e0629	453	5	024e26c7-5e33-4f35-a88e-e6f5c9322e02	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Кондиционер,Полотенца,Гардероб,Кухня}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
8cb9530b-e007-45ac-aa7a-85a03725ea67	834	5	024e26c7-5e33-4f35-a88e-e6f5c9322e02	9a61965b-6d2d-471d-945b-d013ba8e5784	{Полотенца,Гардероб,Кухня}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
8f35bc77-44df-499b-8899-bc85661e34c8	734	1	024e26c7-5e33-4f35-a88e-e6f5c9322e02	87defdd3-016b-450f-8155-bfd43d8a2edf	{Полотенца,Гардероб,Кухня,Холодильник,Туалет,Ванна,Телевизор,Кондиционер,Тапочки,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
95d5191c-f100-444f-b8b3-de62cbf1c135	478	4	024e26c7-5e33-4f35-a88e-e6f5c9322e02	9a61965b-6d2d-471d-945b-d013ba8e5784	{Телевизор,Полотенца,Гардероб,Кухня,Холодильник,Туалет}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
9871bdc1-68ce-471b-b539-e86ffa909c3c	512	2	024e26c7-5e33-4f35-a88e-e6f5c9322e02	7d500222-3191-46f5-9978-e35e67624a14	{Ванна,Полотенца,Гардероб,Кухня,Тапочки,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
b7fa1bb1-10b8-427f-9a6b-5e6b62f96806	411	4	024e26c7-5e33-4f35-a88e-e6f5c9322e02	9a61965b-6d2d-471d-945b-d013ba8e5784	{Телевизор,Полотенца,Гардероб,Кухня,Холодильник,Туалет}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
bad2a790-0d0c-416e-bc7f-f4bfe8420d8d	113	1	5e6c8c25-5492-447c-9c2b-eb1fe1a2a208	7d500222-3191-46f5-9978-e35e67624a14	{Полотенца,Гардероб,Кухня,Туалет,Кондиционер,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
bed9e222-f92a-4e18-a01b-3ae4bcacafe7	563	2	024e26c7-5e33-4f35-a88e-e6f5c9322e02	7d500222-3191-46f5-9978-e35e67624a14	{Ванна,Полотенца,Гардероб,Кухня,Тапочки,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
c76c5bc5-45dd-4629-88d9-0b7b36ac8208	467	1	024e26c7-5e33-4f35-a88e-e6f5c9322e02	87defdd3-016b-450f-8155-bfd43d8a2edf	{Полотенца,Гардероб,Кухня,Холодильник,Туалет,Ванна,Телевизор,Кондиционер,Тапочки,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
c8b2a1e5-ad88-40a4-9316-eff695654034	456	4	024e26c7-5e33-4f35-a88e-e6f5c9322e02	9a61965b-6d2d-471d-945b-d013ba8e5784	{Телевизор,Полотенца,Гардероб,Кухня,Холодильник,Туалет}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
cbfce343-4362-494f-a595-9fd522c8b22a	777	4	024e26c7-5e33-4f35-a88e-e6f5c9322e02	87defdd3-016b-450f-8155-bfd43d8a2edf	{Полотенца,Гардероб,Кухня,Туалет,Ванна,Телевизор,Кондиционер,Тапочки,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
ce799158-5c04-4640-b55a-f4700bc3c386	284	2	024e26c7-5e33-4f35-a88e-e6f5c9322e02	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Полотенца,Гардероб,Кухня,Тапочки,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
d86983c8-eece-4182-980e-2fdc9eaa9e27	111	1	5e6c8c25-5492-447c-9c2b-eb1fe1a2a208	7d500222-3191-46f5-9978-e35e67624a14	{Полотенца,Гардероб,Кухня,Туалет,Кондиционер,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
d8dcee53-ea8a-4e45-a5a4-beab2d32510c	518	2	024e26c7-5e33-4f35-a88e-e6f5c9322e02	7d500222-3191-46f5-9978-e35e67624a14	{Ванна,Полотенца,Гардероб,Кухня,Тапочки,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
dac29927-4108-4afd-bb74-4fa397be0fa7	765	2	024e26c7-5e33-4f35-a88e-e6f5c9322e02	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Полотенца,Вайфай,Ванна,Телевизор}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
db96d342-11ae-4e10-b2d8-8cf1850e667a	104	2	024e26c7-5e33-4f35-a88e-e6f5c9322e02	7d500222-3191-46f5-9978-e35e67624a14	{Полотенца,Гардероб,Кухня,Холодильник,Туалет,Ванна,Телевизор,Кондиционер,Вайфай,Тапочки}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
e0beb295-1a37-49d0-9c69-33f4d936f361	335	2	024e26c7-5e33-4f35-a88e-e6f5c9322e02	87defdd3-016b-450f-8155-bfd43d8a2edf	{Полотенца,Гардероб,Кухня,Холодильник,Туалет}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
e25f1a00-d4ff-4ad1-bee0-9d48d16c23c4	318	2	024e26c7-5e33-4f35-a88e-e6f5c9322e02	7d500222-3191-46f5-9978-e35e67624a14	{Ванна,Полотенца,Гардероб,Кухня,Тапочки,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
\.


--
-- TOC entry 4987 (class 0 OID 16535)
-- Dependencies: 226
-- Data for Name: roomfacility; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roomfacility (id_facility, facility) FROM stdin;
54d34417-da7a-4ed4-baf1-72949b8246a9	Полотенца
53351633-d496-488a-b4b5-a7d3f2606d90	Гардероб
7836e0c4-4bdb-43b3-847c-2eaceae0fd35	Кухня
aa837dfe-fa76-4051-9b8f-d6e6bc601ee7	Холодильник
4ba82eed-fa25-44e5-86d8-dd5bd04c27ac	Туалет
f4767ec1-8558-4e42-8fe6-137d61ad3f27	Ванна
64ff65ae-4f4d-4499-b95e-76314f6fd399	Телевизор
2fdae94a-d34d-4017-b28a-46abd7df94b3	Кондиционер
4cdc2792-d31a-41ef-ac3e-32b4ea2b2491	Тапочки
0f0679ee-dc18-4191-994f-356142630cb7	Вайфай
\.


--
-- TOC entry 4991 (class 0 OID 16553)
-- Dependencies: 230
-- Data for Name: roomservicestatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roomservicestatus (id_status_guest_room, status_guest_room, color_sgr) FROM stdin;
0623770d-2d02-495c-a60c-f757e29bd226	Грязный	red
2e74346c-439f-4c06-9fd8-428a9abbcc97	Убирается	orange
76504da9-eff2-4fdd-becb-43b4ade0ef92	Проверяется	geekblue
8c18094a-7f8b-4ad8-8023-e4419371c3b5	Чистый	green
\.


--
-- TOC entry 4988 (class 0 OID 16539)
-- Dependencies: 227
-- Data for Name: roomstatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roomstatus (id_status, status, color) FROM stdin;
b4cc08c0-0c4b-4d81-ad4e-475e816d08e6	Заблокировано 	\N
024e26c7-5e33-4f35-a88e-e6f5c9322e02	Доступно	geekblue
5e6c8c25-5492-447c-9c2b-eb1fe1a2a208	Заселено	green
91128392-8f10-4cde-9684-0148536f9a1b	Забронировано	volcano
c6d79c91-1ffa-4cd2-a1d2-d352914e82e2	Ожидание	orange
\.


--
-- TOC entry 4989 (class 0 OID 16543)
-- Dependencies: 228
-- Data for Name: roomtype; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roomtype (id_room_type, room_type) FROM stdin;
87defdd3-016b-450f-8155-bfd43d8a2edf	VIP
34b88687-dac5-40ac-9bf5-27e83ae1d590	Одна кровать
7d500222-3191-46f5-9978-e35e67624a14	Две кровати
9a61965b-6d2d-471d-945b-d013ba8e5784	Три кровати
\.


--
-- TOC entry 4990 (class 0 OID 16547)
-- Dependencies: 229
-- Data for Name: statusguest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.statusguest (id_status_guest, status_guest, color_sg) FROM stdin;
c5418723-6d2a-420d-93e4-9d896cecf452	Прибыл	green
de86a967-0104-4c67-80be-8b119d34d9e0	Выехал	blue
e753c074-fb74-40e3-82a7-10df78a69fa6	Должен прибыть	orange
700b098c-cbd1-4616-9c3f-bc82ba24b281	Должен выехать	red
\.


--
-- TOC entry 4994 (class 0 OID 24808)
-- Dependencies: 233
-- Data for Name: statusrepair; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.statusrepair (id_status_repair, status_repair, color) FROM stdin;
f4fde8d2-9993-4739-ba23-e9dd749ef46d	Отменена	red
68f08224-fc5a-4f75-8e4d-12c0279f2527	Завершена	geekblue
dce20919-ca67-483c-81d8-262d133311a6	В процессе	orange
4b89fc86-1dba-4459-9c78-f4cad967cd70	Новая	green
\.


--
-- TOC entry 4992 (class 0 OID 16559)
-- Dependencies: 231
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id_user, login, password, role, email) FROM stdin;
0c0e88d6-34c4-414a-a4a0-1bf840da8664	user	qwerty	user	user@mail.ru
68eef0a9-9ec0-4c5e-a658-c23ab443c300	asd	asd	user	asd@asd.ru
43926757-6bd7-49bb-9b8d-968cfe7d608b	qwe	qwe	user	qwe@qwe.ru
d75ef8a2-8bb0-4a57-91c3-0f4b67c22b90	zxc	zxc	user	zxc@zxc.ru
e8e8db5b-0345-4bc3-9933-f9a4f87d840e	fgh	fgh	user	fgh@ghj.ru
652d6c94-c788-408b-9431-d5d2102ed2f6	admin	admin	admin	admin@mail.ru
05dfe14e-ca53-48aa-96e4-c7d75af33fc5	leshaShakal	qwerty	user	leshaShakal@mail.ru
\.


--
-- TOC entry 5003 (class 0 OID 0)
-- Dependencies: 225
-- Name: room_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_seq', 27, true);


--
-- TOC entry 4795 (class 2606 OID 16567)
-- Name: booking booking_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_pkey PRIMARY KEY (id_booking);


--
-- TOC entry 4797 (class 2606 OID 16569)
-- Name: cancellationpolicy cancellationpolicy_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cancellationpolicy
    ADD CONSTRAINT cancellationpolicy_pkey PRIMARY KEY (id_cancellation_policy);


--
-- TOC entry 4799 (class 2606 OID 16571)
-- Name: deal deal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deal
    ADD CONSTRAINT deal_pkey PRIMARY KEY (id_deal);


--
-- TOC entry 4801 (class 2606 OID 16573)
-- Name: dealstatus dealstatus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dealstatus
    ADD CONSTRAINT dealstatus_pkey PRIMARY KEY (id_status_deal);


--
-- TOC entry 4803 (class 2606 OID 16575)
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id_employee);


--
-- TOC entry 4805 (class 2606 OID 16577)
-- Name: guests guests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guests
    ADD CONSTRAINT guests_pkey PRIMARY KEY (id_guest);


--
-- TOC entry 4829 (class 2606 OID 33001)
-- Name: hotelproperties hotelproperties_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotelproperties
    ADD CONSTRAINT hotelproperties_pk PRIMARY KEY (id_hotel_properties);


--
-- TOC entry 4831 (class 2606 OID 33009)
-- Name: personaldatastoragepolicy personal_data_storage_policy_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personaldatastoragepolicy
    ADD CONSTRAINT personal_data_storage_policy_pk PRIMARY KEY (id_personal_data_storage_policy);


--
-- TOC entry 4807 (class 2606 OID 16579)
-- Name: positions positions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_pkey PRIMARY KEY (id_position);


--
-- TOC entry 4809 (class 2606 OID 16581)
-- Name: rate rate_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rate
    ADD CONSTRAINT rate_pkey PRIMARY KEY (id_rate);


--
-- TOC entry 4825 (class 2606 OID 24806)
-- Name: repairroom repairroom_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.repairroom
    ADD CONSTRAINT repairroom_pkey PRIMARY KEY (id_repair);


--
-- TOC entry 4813 (class 2606 OID 16583)
-- Name: roomfacility room-facility_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roomfacility
    ADD CONSTRAINT "room-facility_pkey" PRIMARY KEY (id_facility);


--
-- TOC entry 4815 (class 2606 OID 16585)
-- Name: roomstatus room-status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roomstatus
    ADD CONSTRAINT "room-status_pkey" PRIMARY KEY (id_status);


--
-- TOC entry 4817 (class 2606 OID 16587)
-- Name: roomtype room-type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roomtype
    ADD CONSTRAINT "room-type_pkey" PRIMARY KEY (id_room_type);


--
-- TOC entry 4811 (class 2606 OID 16589)
-- Name: room room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_pkey PRIMARY KEY (id_room);


--
-- TOC entry 4819 (class 2606 OID 16591)
-- Name: statusguest statusguest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.statusguest
    ADD CONSTRAINT statusguest_pkey PRIMARY KEY (id_status_guest);


--
-- TOC entry 4821 (class 2606 OID 16593)
-- Name: roomservicestatus statusguestroom_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roomservicestatus
    ADD CONSTRAINT statusguestroom_pkey PRIMARY KEY (id_status_guest_room);


--
-- TOC entry 4827 (class 2606 OID 24815)
-- Name: statusrepair statusrepair_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.statusrepair
    ADD CONSTRAINT statusrepair_pkey PRIMARY KEY (id_status_repair);


--
-- TOC entry 4823 (class 2606 OID 16595)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- TOC entry 4832 (class 2606 OID 16596)
-- Name: room id_room_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT id_room_type FOREIGN KEY (id_room_type) REFERENCES public.roomtype(id_room_type);


--
-- TOC entry 4833 (class 2606 OID 16601)
-- Name: room id_status_pkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT id_status_pkey FOREIGN KEY (id_status) REFERENCES public.roomstatus(id_status);


-- Completed on 2024-04-11 22:50:22

--
-- PostgreSQL database dump complete
--

