--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-04-21 13:46:19

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
22e5dbe7-0c3d-4939-8c10-c746836d5583	c98b0b4c-acbc-4f00-8c3c-7f443dfbbd15	24844fad-d973-4859-95e3-77704ccef537	2024-04-13	2024-04-14	1	1	4050	1efe2c71-c5a5-4b14-8f24-4f62d633218d
56b2ee6a-508e-4de4-bf91-962b54fd316a	cb3ebef4-75b3-4f66-b04e-3953afa51fe8	0a41d70c-7a32-413f-b647-a3cbe32d0021	2024-04-18	2024-04-20	1	1	5400	3e435165-7476-47a2-8678-a7534b3946e5
df2bde7c-ee87-43c8-8df8-825b8a867640	af931c05-1735-43f8-982d-bd3326270aec	3ba39977-c185-49d1-be03-5187699c0e68	2024-04-19	2024-04-21	2	0	5940	88e00426-8016-41a8-82fe-2da33b7e8e2e
20ae8f13-4218-407c-bcfd-45485cdd8906	1f04c6c4-4465-4dc7-aac4-69f7eb17125f	10bdd343-a09d-4878-8c51-901389b45b6b	2024-04-19	2024-04-20	1	0	4500	f8835666-c616-47b3-b43a-24423a2961be
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
7bdfd671-ef73-4395-b26c-43ef35878d48	1624	Виктор	Милонов	Степанович	+79962866102	de86a967-0104-4c67-80be-8b119d34d9e0	0a41d70c-7a32-413f-b647-a3cbe32d0021	juliennestupid@jcnorris.com
c98b0b4c-acbc-4f00-8c3c-7f443dfbbd15	1460	asd	asd	asd	+7123123123123	de86a967-0104-4c67-80be-8b119d34d9e0	24844fad-d973-4859-95e3-77704ccef537	asd@qwe.ru
1f04c6c4-4465-4dc7-aac4-69f7eb17125f	3360	fasdf	asdf	asdf	+79084880116	700b098c-cbd1-4616-9c3f-bc82ba24b281	10bdd343-a09d-4878-8c51-901389b45b6b	asf@dfsdf.ri
af931c05-1735-43f8-982d-bd3326270aec	9081	уйкцук	йцукйцук	йцукйцукйцук	+7123456563456	700b098c-cbd1-4616-9c3f-bc82ba24b281	3ba39977-c185-49d1-be03-5187699c0e68	qwerty@qwerty.ru
8f69e875-c781-42e8-aa0a-f5ef31f5b6a9	1462	Василиса	Морозова	Александровна	+790867886687	de86a967-0104-4c67-80be-8b119d34d9e0	0637ac9b-79cf-4421-b072-67f25cf24255	\N
cb3ebef4-75b3-4f66-b04e-3953afa51fe8	1565	йкуцк	кйцукйцук	йцукцуукцйук	+732452345345	de86a967-0104-4c67-80be-8b119d34d9e0	0a41d70c-7a32-413f-b647-a3cbe32d0021	ok.brows@mail.ru
57bbbc57-4e75-4b5b-8428-f0af6718a722	3090	Алексей	Алексеев	Алексеевич	+77089783456	de86a967-0104-4c67-80be-8b119d34d9e0	37895c8c-709e-4e21-9f36-7918f0bd2155	\N
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
cb100e8c-0c73-42cc-a701-7870bfc3f5d1	Отель	data:image/png;base64,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	Россия	Брянская область	Брянск	Октяборьская	2	4	100	lamurka1337@yandex.ru	+79084880116	Мясников Денис Сергеевич	+79084880116	lamurka1337@yandex.ru	fca278a2-02c9-41db-895a-ca4e951d8e68
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
3e435165-7476-47a2-8678-a7534b3946e5	7d500222-3191-46f5-9978-e35e67624a14	80e5070d-366a-41ed-8fb1-6e96815499ae	a5735845-9847-44d9-b089-18480678725f	3000
\.


--
-- TOC entry 4993 (class 0 OID 24800)
-- Dependencies: 232
-- Data for Name: repairroom; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.repairroom (id_repair, id_room, name_work, description_work, start_date, end_date, id_status_repair, closeroom) FROM stdin;
934902e8-a189-4e09-a01b-cbde11d8efa8	0a41d70c-7a32-413f-b647-a3cbe32d0021	Ремонт двери	Скрипит дверь	2024-03-18	2024-03-19	4b89fc86-1dba-4459-9c78-f4cad967cd70	f
9c79d8c6-5f67-4e98-8576-fb3c0066cb28	0637ac9b-79cf-4421-b072-67f25cf24255	Ремонт крана	Кран протекает 	2024-03-15	2024-03-16	68f08224-fc5a-4f75-8e4d-12c0279f2527	f
6dc16b28-378e-4ea2-b31d-18ae0ea5859d	0637ac9b-79cf-4421-b072-67f25cf24255	Ремонт двери	Починить ручку, дверь не закрывается 	2024-03-15	2024-03-16	f4fde8d2-9993-4739-ba23-e9dd749ef46d	f
\.


--
-- TOC entry 4985 (class 0 OID 16529)
-- Dependencies: 224
-- Data for Name: room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room (id_room, room_number, room_floor, id_status, id_room_type, facility, id_room_service_status, id_repair) FROM stdin;
36ed65f9-6e93-4797-80aa-73e79dcb375b	676	5	b4cc08c0-0c4b-4d81-ad4e-475e816d08e6	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Гардероб,Кухня,Холодильник,Туалет}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	{}
1281db3f-669d-487f-85b5-de0b9d6e553c	543	5	b4cc08c0-0c4b-4d81-ad4e-475e816d08e6	9a61965b-6d2d-471d-945b-d013ba8e5784	{Полотенца,Гардероб,Кухня}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	{}
24844fad-d973-4859-95e3-77704ccef537	653	5	91128392-8f10-4cde-9684-0148536f9a1b	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Кондиционер,Полотенца,Гардероб,Кухня}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	\N
2790a438-a84a-4d49-805d-beeaa600d643	469	1	024e26c7-5e33-4f35-a88e-e6f5c9322e02	87defdd3-016b-450f-8155-bfd43d8a2edf	{Полотенца,Гардероб,Кухня,Холодильник,Туалет,Ванна,Телевизор,Кондиционер,Тапочки,Вайфай}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	\N
26f951ec-0d7d-4a6f-9539-fc19c320104e	345	2	024e26c7-5e33-4f35-a88e-e6f5c9322e02	87defdd3-016b-450f-8155-bfd43d8a2edf	{Полотенца,Гардероб,Кухня,Холодильник,Туалет}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	\N
0d4b2728-540f-464e-bc83-93016e8a99b6	421	4	024e26c7-5e33-4f35-a88e-e6f5c9322e02	9a61965b-6d2d-471d-945b-d013ba8e5784	{Телевизор,Полотенца,Гардероб,Кухня,Холодильник,Туалет}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	{}
0a41d70c-7a32-413f-b647-a3cbe32d0021	517	2	91128392-8f10-4cde-9684-0148536f9a1b	7d500222-3191-46f5-9978-e35e67624a14	{Ванна,Полотенца,Гардероб,Кухня,Тапочки,Вайфай}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	{934902e8-a189-4e09-a01b-cbde11d8efa8,09124232-7526-42ef-be55-d964c9076d2f}
3c654150-31b7-446c-838a-381f0706c43e	675	3	c6d79c91-1ffa-4cd2-a1d2-d352914e82e2	7d500222-3191-46f5-9978-e35e67624a14	{Гардероб,Кухня,Вайфай,Холодильник,Ванна}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
11145a82-2400-4896-baa0-a0ab78ad2413	125	1	024e26c7-5e33-4f35-a88e-e6f5c9322e02	87defdd3-016b-450f-8155-bfd43d8a2edf	{Телевизор,Полотенца,Гардероб}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	{}
10bdd343-a09d-4878-8c51-901389b45b6b	123	1	91128392-8f10-4cde-9684-0148536f9a1b	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Полотенца,Гардероб,Кухня,Холодильник,Туалет}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	{}
209af2be-f066-4817-90e2-ce0df1ac026a	654	5	b4cc08c0-0c4b-4d81-ad4e-475e816d08e6	9a61965b-6d2d-471d-945b-d013ba8e5784	{Полотенца,Гардероб,Кухня}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	{}
1d6d80c0-5661-4ded-aae4-441bfe12f063	213	5	024e26c7-5e33-4f35-a88e-e6f5c9322e02	9a61965b-6d2d-471d-945b-d013ba8e5784	{Полотенца,Гардероб,Кухня}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	{}
0bb547be-92ef-4dfb-a136-b364693bc48c	281	2	024e26c7-5e33-4f35-a88e-e6f5c9322e02	7d500222-3191-46f5-9978-e35e67624a14	{Ванна,Полотенца,Гардероб,Кухня,Тапочки,Вайфай}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	{}
0637ac9b-79cf-4421-b072-67f25cf24255	278	4	024e26c7-5e33-4f35-a88e-e6f5c9322e02	9a61965b-6d2d-471d-945b-d013ba8e5784	{Ванна,Телевизор,Полотенца,Гардероб,Кухня,Холодильник,Туалет}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	{6dc16b28-378e-4ea2-b31d-18ae0ea5859d,9c79d8c6-5f67-4e98-8576-fb3c0066cb28,f63a8e90-c79b-4472-a2fd-83712a011b56,559efa78-78c1-41d1-b8cf-1514d5af6bc9,35a330b0-efeb-4c81-8c23-4b8b8140729b,402ac9f5-3564-4b1d-bbb1-7fc983f650fa,6b416c6c-4a6b-4059-a2d9-cba038cba03c}
bc72ed64-9159-49b8-b54a-e325f6d487a2	276	4	024e26c7-5e33-4f35-a88e-e6f5c9322e02	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Полотенца,Телевизор,Кондиционер,Тапочки}	8c18094a-7f8b-4ad8-8023-e4419371c3b5	\N
37168b38-1130-4765-9a92-2548d147e81c	234	3	024e26c7-5e33-4f35-a88e-e6f5c9322e02	7d500222-3191-46f5-9978-e35e67624a14	{Полотенца,Гардероб,Кухня,Вайфай,Холодильник}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
37895c8c-709e-4e21-9f36-7918f0bd2155	122	2	91128392-8f10-4cde-9684-0148536f9a1b	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Кухня,Ванна,Холодильник}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
3ba39977-c185-49d1-be03-5187699c0e68	205	5	91128392-8f10-4cde-9684-0148536f9a1b	34b88687-dac5-40ac-9bf5-27e83ae1d590	{Кондиционер,Полотенца,Гардероб,Кухня}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
3e0779a4-fcea-4ccf-a1fa-a9e0e3a6e39e	567	1	024e26c7-5e33-4f35-a88e-e6f5c9322e02	87defdd3-016b-450f-8155-bfd43d8a2edf	{Полотенца,Гардероб,Кухня,Холодильник,Туалет,Ванна,Телевизор,Кондиционер,Тапочки,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	{}
3bba0cb1-121c-4eb5-a688-87f080df7557	134	1	024e26c7-5e33-4f35-a88e-e6f5c9322e02	87defdd3-016b-450f-8155-bfd43d8a2edf	{Полотенца,Гардероб,Кухня,Холодильник,Туалет,Ванна,Телевизор,Кондиционер,Тапочки,Вайфай}	2e74346c-439f-4c06-9fd8-428a9abbcc97	\N
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


-- Completed on 2024-04-21 13:46:20

--
-- PostgreSQL database dump complete
--

