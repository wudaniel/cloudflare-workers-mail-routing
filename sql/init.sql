create table dest_addresses
(
    id      integer not null
        constraint dest_addresses_pk
            primary key autoincrement,
    email   TEXT    not null
        constraint dest_addresses_pk_2
            unique,
    comment TEXT
);

create table domain
(
    id   integer not null
        constraint domain_pk
            primary key autoincrement,
    name text    not null
        constraint domain_pk2
            unique
);

create table user
(
    id        integer not null
        constraint user_pk
            primary key autoincrement,
    name      TEXT    not null,
    domain_id integer not null
        constraint user_domain_id_fk
            references domain,
    tag       TEXT,
    dest_id   integer not null
        constraint user_dest_addresses_id_fk
            references dest_addresses,
    constraint user_pk2
        unique (domain_id, name, tag)
);

