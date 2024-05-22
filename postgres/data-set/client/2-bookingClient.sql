--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.2

-- Started on 2024-05-22 01:04:47

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 41529)
-- Name: clean_journal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clean_journal (
    id uuid NOT NULL,
    booking_id uuid NOT NULL,
    date date NOT NULL
);


ALTER TABLE public.clean_journal OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 41479)
-- Name: client; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.client (
    id uuid NOT NULL,
    birthday date NOT NULL
);


ALTER TABLE public.client OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 49767)
-- Name: frontend_config; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.frontend_config (
    id uuid NOT NULL,
    hotel_id uuid NOT NULL
);


ALTER TABLE public.frontend_config OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 49908)
-- Name: frontend_footer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.frontend_footer (
    display_logo boolean DEFAULT true NOT NULL,
    display_label boolean DEFAULT true NOT NULL,
    display_social_block boolean DEFAULT false NOT NULL,
    frontend_id uuid NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.frontend_footer OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 49921)
-- Name: frontend_footer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.frontend_footer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.frontend_footer_id_seq OWNER TO postgres;

--
-- TOC entry 4904 (class 0 OID 0)
-- Dependencies: 229
-- Name: frontend_footer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.frontend_footer_id_seq OWNED BY public.frontend_footer.id;


--
-- TOC entry 225 (class 1259 OID 49772)
-- Name: frontend_header; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.frontend_header (
    id uuid NOT NULL,
    frontend_id uuid NOT NULL,
    display_logo boolean DEFAULT true NOT NULL,
    display_search boolean DEFAULT true NOT NULL,
    display_details boolean DEFAULT true NOT NULL,
    display_booking_button boolean DEFAULT true NOT NULL,
    display_label boolean DEFAULT false NOT NULL,
    background_color character varying DEFAULT '#3c3c3c'::character varying NOT NULL
);


ALTER TABLE public.frontend_header OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 49791)
-- Name: frontend_main_page; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.frontend_main_page (
    id uuid NOT NULL,
    frontend_id uuid NOT NULL,
    cover_type character varying DEFAULT 'static'::character varying NOT NULL,
    display_discount boolean DEFAULT true NOT NULL,
    display_booking boolean DEFAULT true NOT NULL,
    display_popular boolean DEFAULT false NOT NULL,
    display_faq boolean DEFAULT true NOT NULL
);


ALTER TABLE public.frontend_main_page OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 49816)
-- Name: frontend_profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.frontend_profile (
    id uuid NOT NULL,
    frontend_id uuid NOT NULL,
    avatar_shape character varying DEFAULT 'ROUND'::character varying NOT NULL
);


ALTER TABLE public.frontend_profile OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 41489)
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id uuid NOT NULL,
    client_id uuid NOT NULL,
    is_readed boolean DEFAULT false NOT NULL,
    title character varying NOT NULL,
    message character varying NOT NULL,
    date date
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 41484)
-- Name: payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment (
    id uuid NOT NULL,
    client_id uuid NOT NULL,
    card_number bigint NOT NULL,
    card_expire date NOT NULL
);


ALTER TABLE public.payment OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 41497)
-- Name: review_room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review_room (
    id uuid NOT NULL,
    client_id uuid NOT NULL,
    message character varying NOT NULL,
    rate real NOT NULL,
    date date NOT NULL
);


ALTER TABLE public.review_room OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 41504)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
)
INHERITS (public.review_room);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 41521)
-- Name: service; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.service (
    id uuid NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    price real NOT NULL,
    is_available boolean DEFAULT true NOT NULL
);


ALTER TABLE public.service OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 41511)
-- Name: service_receipt; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.service_receipt (
    id uuid NOT NULL,
    client_id uuid NOT NULL,
    date date NOT NULL
);


ALTER TABLE public.service_receipt OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 41516)
-- Name: service_receipt_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.service_receipt_item (
    id uuid NOT NULL,
    service_id uuid NOT NULL,
    service_receipt_id uuid NOT NULL,
    price real NOT NULL
);


ALTER TABLE public.service_receipt_item OWNER TO postgres;

--
-- TOC entry 4703 (class 2604 OID 49922)
-- Name: frontend_footer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.frontend_footer ALTER COLUMN id SET DEFAULT nextval('public.frontend_footer_id_seq'::regclass);


--
-- TOC entry 4892 (class 0 OID 41529)
-- Dependencies: 223
-- Data for Name: clean_journal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clean_journal (id, booking_id, date) FROM stdin;
\.


--
-- TOC entry 4884 (class 0 OID 41479)
-- Dependencies: 215
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.client (id, birthday) FROM stdin;
\.


--
-- TOC entry 4893 (class 0 OID 49767)
-- Dependencies: 224
-- Data for Name: frontend_config; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.frontend_config (id, hotel_id) FROM stdin;
67342c88-fd1e-425b-99b1-3cdc427b914a	cb100e8c-0c73-42cc-a701-7870bfc3f5d1
\.


--
-- TOC entry 4897 (class 0 OID 49908)
-- Dependencies: 228
-- Data for Name: frontend_footer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.frontend_footer (display_logo, display_label, display_social_block, frontend_id, id) FROM stdin;
t	t	t	67342c88-fd1e-425b-99b1-3cdc427b914a	1
\.


--
-- TOC entry 4894 (class 0 OID 49772)
-- Dependencies: 225
-- Data for Name: frontend_header; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.frontend_header (id, frontend_id, display_logo, display_search, display_details, display_booking_button, display_label, background_color) FROM stdin;
229a2011-1415-43a6-b779-cf88cf7513da	67342c88-fd1e-425b-99b1-3cdc427b914a	t	f	t	t	t	#74c27b
\.


--
-- TOC entry 4895 (class 0 OID 49791)
-- Dependencies: 226
-- Data for Name: frontend_main_page; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.frontend_main_page (id, frontend_id, cover_type, display_discount, display_booking, display_popular, display_faq) FROM stdin;
84c8fa34-9f1e-4509-a175-551a7404d2c9	67342c88-fd1e-425b-99b1-3cdc427b914a	static	f	t	f	t
\.


--
-- TOC entry 4896 (class 0 OID 49816)
-- Dependencies: 227
-- Data for Name: frontend_profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.frontend_profile (id, frontend_id, avatar_shape) FROM stdin;
d80f0e22-0f3a-4727-a83b-cc26dc5c3a62	67342c88-fd1e-425b-99b1-3cdc427b914a	ROUND
\.


--
-- TOC entry 4886 (class 0 OID 41489)
-- Dependencies: 217
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, client_id, is_readed, title, message, date) FROM stdin;
\.


--
-- TOC entry 4885 (class 0 OID 41484)
-- Dependencies: 216
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment (id, client_id, card_number, card_expire) FROM stdin;
\.


--
-- TOC entry 4887 (class 0 OID 41497)
-- Dependencies: 218
-- Data for Name: review_room; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.review_room (id, client_id, message, rate, date) FROM stdin;
\.


--
-- TOC entry 4888 (class 0 OID 41504)
-- Dependencies: 219
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, client_id, message, rate, date) FROM stdin;
\.


--
-- TOC entry 4891 (class 0 OID 41521)
-- Dependencies: 222
-- Data for Name: service; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.service (id, name, description, price, is_available) FROM stdin;
\.


--
-- TOC entry 4889 (class 0 OID 41511)
-- Dependencies: 220
-- Data for Name: service_receipt; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.service_receipt (id, client_id, date) FROM stdin;
\.


--
-- TOC entry 4890 (class 0 OID 41516)
-- Dependencies: 221
-- Data for Name: service_receipt_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.service_receipt_item (id, service_id, service_receipt_id, price) FROM stdin;
\.


--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 229
-- Name: frontend_footer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.frontend_footer_id_seq', 1, true);


--
-- TOC entry 4721 (class 2606 OID 41533)
-- Name: clean_journal clean_journal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clean_journal
    ADD CONSTRAINT clean_journal_pkey PRIMARY KEY (id);


--
-- TOC entry 4705 (class 2606 OID 41483)
-- Name: client client_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- TOC entry 4723 (class 2606 OID 49771)
-- Name: frontend_config frontend_config_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.frontend_config
    ADD CONSTRAINT frontend_config_pkey PRIMARY KEY (id);


--
-- TOC entry 4727 (class 2606 OID 49798)
-- Name: frontend_main_page frontend_main_page_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.frontend_main_page
    ADD CONSTRAINT frontend_main_page_pkey PRIMARY KEY (id);


--
-- TOC entry 4725 (class 2606 OID 49779)
-- Name: frontend_header header_config_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.frontend_header
    ADD CONSTRAINT header_config_pkey PRIMARY KEY (id);


--
-- TOC entry 4709 (class 2606 OID 41496)
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- TOC entry 4707 (class 2606 OID 41488)
-- Name: payment payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (id);


--
-- TOC entry 4729 (class 2606 OID 49823)
-- Name: frontend_profile profile_config_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.frontend_profile
    ADD CONSTRAINT profile_config_pkey PRIMARY KEY (id);


--
-- TOC entry 4711 (class 2606 OID 41503)
-- Name: review_room review_room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review_room
    ADD CONSTRAINT review_room_pkey PRIMARY KEY (id);


--
-- TOC entry 4713 (class 2606 OID 41510)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (date);


--
-- TOC entry 4719 (class 2606 OID 41528)
-- Name: service service_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_pkey PRIMARY KEY (id);


--
-- TOC entry 4717 (class 2606 OID 41520)
-- Name: service_receipt_item service_receipt_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service_receipt_item
    ADD CONSTRAINT service_receipt_item_pkey PRIMARY KEY (id);


--
-- TOC entry 4715 (class 2606 OID 41515)
-- Name: service_receipt service_receipt_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service_receipt
    ADD CONSTRAINT service_receipt_pkey PRIMARY KEY (id);


--
-- TOC entry 4731 (class 2606 OID 41534)
-- Name: notifications FK_client_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "FK_client_id" FOREIGN KEY (client_id) REFERENCES public.client(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4730 (class 2606 OID 41539)
-- Name: payment FK_client_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT "FK_client_id" FOREIGN KEY (client_id) REFERENCES public.client(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4733 (class 2606 OID 41549)
-- Name: reviews FK_client_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "FK_client_id" FOREIGN KEY (client_id) REFERENCES public.client(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4734 (class 2606 OID 41559)
-- Name: service_receipt FK_client_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service_receipt
    ADD CONSTRAINT "FK_client_id" FOREIGN KEY (client_id) REFERENCES public.client(id) NOT VALID;


--
-- TOC entry 4732 (class 2606 OID 41544)
-- Name: review_room FK_client_ud; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review_room
    ADD CONSTRAINT "FK_client_ud" FOREIGN KEY (client_id) REFERENCES public.client(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4737 (class 2606 OID 49780)
-- Name: frontend_header FK_frontend_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.frontend_header
    ADD CONSTRAINT "FK_frontend_id" FOREIGN KEY (frontend_id) REFERENCES public.frontend_config(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4738 (class 2606 OID 49799)
-- Name: frontend_main_page FK_frontend_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.frontend_main_page
    ADD CONSTRAINT "FK_frontend_id" FOREIGN KEY (frontend_id) REFERENCES public.frontend_config(id);


--
-- TOC entry 4739 (class 2606 OID 49824)
-- Name: frontend_profile FK_frontend_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.frontend_profile
    ADD CONSTRAINT "FK_frontend_id" FOREIGN KEY (frontend_id) REFERENCES public.frontend_config(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4735 (class 2606 OID 41554)
-- Name: service_receipt_item FK_service_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service_receipt_item
    ADD CONSTRAINT "FK_service_id" FOREIGN KEY (service_id) REFERENCES public.service(id) NOT VALID;


--
-- TOC entry 4736 (class 2606 OID 41564)
-- Name: service_receipt_item FK_service_receipt_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service_receipt_item
    ADD CONSTRAINT "FK_service_receipt_id" FOREIGN KEY (service_receipt_id) REFERENCES public.service_receipt(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4740 (class 2606 OID 49915)
-- Name: frontend_footer frontend_footer_frontend_config_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.frontend_footer
    ADD CONSTRAINT frontend_footer_frontend_config_id_fk FOREIGN KEY (frontend_id) REFERENCES public.frontend_config(id);


-- Completed on 2024-05-22 01:04:47

--
-- PostgreSQL database dump complete
--

