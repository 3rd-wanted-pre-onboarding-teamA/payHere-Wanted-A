create database pay_here_account_book;
use pay_here_account_book;
create table member ( -- 회원
    member_id varchar(50) not null,
    member_pw varchar(100) not null,
    member_name varchar(50) not null,
    phone_number varchar(13) not null,
    primary key(member_id)
);
create table account_book ( -- 가계부
    account_book_id int not null auto_increment,
    member_id varchar(50) not null,
    type varchar(10) not null check (type in('수입', '지출')),
    amount int not null,
    balance int not null,
    memo text, 
    reg_date datetime default now(), 
    state int default 0 check (state in(0, 1)),
    primary key(account_book_id),
    constraint account_book_member_fk FOREIGN KEY (member_id)
    REFERENCES member(member_id) ON UPDATE CASCADE
);
