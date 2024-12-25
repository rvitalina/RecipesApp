PGDMP                      |         	   recipesdb    16.4    16.4 "               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16398 	   recipesdb    DATABASE     }   CREATE DATABASE recipesdb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE recipesdb;
                postgres    false            �            1259    25008    CookTips    TABLE     �   CREATE TABLE public."CookTips" (
    id integer NOT NULL,
    content text NOT NULL,
    "userId" integer NOT NULL,
    title character varying(255) NOT NULL
);
    DROP TABLE public."CookTips";
       public         heap    postgres    false            �            1259    25007    CookTips_id_seq    SEQUENCE     �   CREATE SEQUENCE public."CookTips_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."CookTips_id_seq";
       public          postgres    false    222                       0    0    CookTips_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."CookTips_id_seq" OWNED BY public."CookTips".id;
          public          postgres    false    221            �            1259    16433    Recipes    TABLE     �  CREATE TABLE public."Recipes" (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    calories integer NOT NULL,
    "mealTime" character varying(255) NOT NULL,
    "preparingTime" integer NOT NULL,
    difficulty character varying(255) NOT NULL,
    instructions text NOT NULL,
    "UserId" integer NOT NULL,
    ingredients character varying(255)[] NOT NULL,
    "coverImage" character varying(255)
);
    DROP TABLE public."Recipes";
       public         heap    postgres    false            �            1259    16432    Recipes_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Recipes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Recipes_id_seq";
       public          postgres    false    219                       0    0    Recipes_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Recipes_id_seq" OWNED BY public."Recipes".id;
          public          postgres    false    218            �            1259    16815    Reviews    TABLE     w   CREATE TABLE public."Reviews" (
    "userId" integer NOT NULL,
    rate integer NOT NULL,
    content text NOT NULL
);
    DROP TABLE public."Reviews";
       public         heap    postgres    false            �            1259    16399    SequelizeMeta    TABLE     R   CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);
 #   DROP TABLE public."SequelizeMeta";
       public         heap    postgres    false            �            1259    16405    Users    TABLE     �   CREATE TABLE public."Users" (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
    DROP TABLE public."Users";
       public         heap    postgres    false            �            1259    16404    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public          postgres    false    217                       0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public          postgres    false    216            d           2604    25011    CookTips id    DEFAULT     n   ALTER TABLE ONLY public."CookTips" ALTER COLUMN id SET DEFAULT nextval('public."CookTips_id_seq"'::regclass);
 <   ALTER TABLE public."CookTips" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            c           2604    16436 
   Recipes id    DEFAULT     l   ALTER TABLE ONLY public."Recipes" ALTER COLUMN id SET DEFAULT nextval('public."Recipes_id_seq"'::regclass);
 ;   ALTER TABLE public."Recipes" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            b           2604    16408    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217                      0    25008    CookTips 
   TABLE DATA           B   COPY public."CookTips" (id, content, "userId", title) FROM stdin;
    public          postgres    false    222   �%                 0    16433    Recipes 
   TABLE DATA           �   COPY public."Recipes" (id, title, calories, "mealTime", "preparingTime", difficulty, instructions, "UserId", ingredients, "coverImage") FROM stdin;
    public          postgres    false    219   �&                 0    16815    Reviews 
   TABLE DATA           <   COPY public."Reviews" ("userId", rate, content) FROM stdin;
    public          postgres    false    220   �*                 0    16399    SequelizeMeta 
   TABLE DATA           /   COPY public."SequelizeMeta" (name) FROM stdin;
    public          postgres    false    215   �*                 0    16405    Users 
   TABLE DATA           6   COPY public."Users" (id, email, password) FROM stdin;
    public          postgres    false    217   ,                  0    0    CookTips_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."CookTips_id_seq"', 4, true);
          public          postgres    false    221                       0    0    Recipes_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Recipes_id_seq"', 42, true);
          public          postgres    false    218                       0    0    Users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Users_id_seq"', 9, true);
          public          postgres    false    216            l           2606    16821    Reviews CookTips_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "CookTips_pkey" PRIMARY KEY ("userId");
 C   ALTER TABLE ONLY public."Reviews" DROP CONSTRAINT "CookTips_pkey";
       public            postgres    false    220            n           2606    25015    CookTips CookTips_pkey1 
   CONSTRAINT     Y   ALTER TABLE ONLY public."CookTips"
    ADD CONSTRAINT "CookTips_pkey1" PRIMARY KEY (id);
 E   ALTER TABLE ONLY public."CookTips" DROP CONSTRAINT "CookTips_pkey1";
       public            postgres    false    222            j           2606    16440    Recipes Recipes_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Recipes"
    ADD CONSTRAINT "Recipes_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Recipes" DROP CONSTRAINT "Recipes_pkey";
       public            postgres    false    219            f           2606    16403     SequelizeMeta SequelizeMeta_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);
 N   ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
       public            postgres    false    215            h           2606    16412    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    217            p           2606    16822    Reviews CookTips_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "CookTips_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Reviews" DROP CONSTRAINT "CookTips_userId_fkey";
       public          postgres    false    217    4712    220            q           2606    25016    CookTips CookTips_userId_fkey1    FK CONSTRAINT     �   ALTER TABLE ONLY public."CookTips"
    ADD CONSTRAINT "CookTips_userId_fkey1" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 L   ALTER TABLE ONLY public."CookTips" DROP CONSTRAINT "CookTips_userId_fkey1";
       public          postgres    false    4712    222    217            o           2606    16510    Recipes Recipes_UserId_fkey1    FK CONSTRAINT     �   ALTER TABLE ONLY public."Recipes"
    ADD CONSTRAINT "Recipes_UserId_fkey1" FOREIGN KEY ("UserId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Recipes" DROP CONSTRAINT "Recipes_UserId_fkey1";
       public          postgres    false    4712    219    217               �   x�-�1
�@E��S�� ���
!#[�2	"�����g��Ő�x�?7rF�f>�͟�J�A�/"���&�US�Z�In��m�'
Jѡ1x����T�1�I�::�*�*�P�SN�/��yF��M&j��h(��3�F0R�;�|�Q�#��X=)��x��K��\�J7�vy�&��R��a)�����ȏ��         �  x��U�n�F]��b�U0�hJ��/�&@���n�zX�`d�M�?��i��~a�zΙ��8�5��{�s���;�����k\��U�{p��Ҟq�.��ԏ�_�t`����{1n��~����'n�Mf>w.�����eq�~�I\�5�+w�K�	|�N�ð[��Ӥ�Y��F���͇O����l� ��nt�½X?�3�,��d��b9APX�Sz�3D� ���E�_+ �g����?껫�3<jK��(`"����C�|8�RZ�8�����GlOi<H�[l08�-���u_��'<p�fM��T	Q��X�e+�ڹc��Oi�i����\��6_H��(�}�yoRN��a�F�jc� b_� ���C@3d��Z��	U�Y�2�.u��ꔂ����X<�^���o�W�H�T#�Q(|Z�}"�UU���#��@:�D��K��0w��]��y���l ��"�p���2�2����0X�/�$��=Oe�j����O���E�n��Kz0+�p�gc&s�ȹ=�/�������K.Pj�gV���fP"��S��*�B�+�+�w����\h�� ���� �Xu\pR��lh� i ��Y��� �9p_�f�އlЮ��ȵ�u�R~�K4��Y!��T�]��!U���!oͣ�%;�.�%���ŗ���Z����K�jk3h��&���{B!	�*�KO(�DR���2l$x�ߜ���� ��#�=��4`��57�3���	c;�\B��5t: ����;�$��tڃ�t甡��-��Ua�*!N*!��EZ�.Ѳo��(���A�]��q�FW�_���3'�x�DA�
n���ְߊ�k���Y�2��D�(|�g�pB���D:W	�<��:�}���f�Et�&HR�J\u?_�ׯ�jiy�
�p���y`\�B;!�=�+��J�Oo%v���"��V>�ã�g�+H�VC�:?��{�m�w׽���,ˍ�         :   x�3�4���.M�H*J�,I+�ά,I�2
_�t���V����]l ���b����  �S         �   x����N�0��y��v�vbQ�pC(ܐ*�X%��Ql���Ԣ?-��vgg��%j�&	��lrp��<$��w��X�"-2�b���5�x�Q��� �<�~�ܝ��n�Ol^�Ї���[�,�����A-��p;�	c~/�,�Z�JT��O� E��.JER�����R#P5��r��֊Y��aX��!�ӏ�
�����eL��?��p���Ø�F��(�o���v�9R��.�r��Ӧ��OuԮ�         �  x�e�K��@��5���E��Q�"����nZt��'����dq�:���%�\0��-gJ��X.~��v`Wۼ���2����N�Vs�J�D���]c �3���W�L��<�}�a=��7��&�M����'g�� 8H�K��Y�t|�Y�Vc[X��#�]�i[���yŧD��D%|�K��1�^萄���)�޹y���C-�UɈMVf`[���o�o��׬ZIp�BK�����kJnS�+���t��ՂWl����*LQ����:�S߀���j�@�:�-q6�ΐ>�y\�p���C��?gVePS�汆5���$=@��ѥa�X���J�0������-�V��GZ�O�-�O1`5�+��r���7�oq�j��1u��|f<Nn���q���
���hw��0I��5�"d�`Y�'S��     