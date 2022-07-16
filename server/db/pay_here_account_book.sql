drop database pay_here_account_book;
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
  purpose varchar(30) not null, 
  payment varchar(10) not null check (payment in('현금', '카드')),
  memo text, 
  use_date date not null,  
  state int default 0 check (state in(0, 1)),
  primary key(account_book_id),
  constraint account_book_member_fk FOREIGN KEY (member_id)
  REFERENCES member(member_id) ON UPDATE CASCADE
);
create table have_money ( -- 잔액
  member_id varchar(50) not null,
  balance int not null,
  primary key(member_id),
	constraint have_money_member_fk FOREIGN KEY (member_id)
  REFERENCES member(member_id) ON UPDATE CASCADE
);
CREATE TABLE refresh_token ( -- 리프레시 토큰
  member_id VARCHAR(50) NOT NULL,
  refresh_token VARCHAR(250) NOT NULL,
  primary key(member_id),
  CONSTRAINT refresh_token_member_fk FOREIGN KEY (member_id)
  REFERENCES member(member_id) ON UPDATE CASCADE
);
-- 가계부 작성에 따른 잔액 변경 트리거
DELIMITER $$
create trigger account_book_balance_trg after insert on account_book
for each row
begin
	if NEW.type = '수입' then begin
		update have_money set 
		have_money.balance = have_money.balance + NEW.amount
		where have_money.member_id = NEW.member_id;
	end; end if;
	if NEW.type = '지출' then begin
		update have_money set 
		have_money.balance = have_money.balance - NEW.amount
		where have_money.member_id = NEW.member_id;
	end; end if;
END$$
DELIMITER ;
-- 가계부 수정에 따른 잔액 변경 트리거
DELIMITER $$
create trigger account_book_update_balance_trg after update on account_book
for each row
begin
	if OLD.type = '수입' and NEW.type = '수입' then begin
		update have_money set 
		have_money.balance = have_money.balance - OLD.amount + NEW.amount
		where have_money.member_id = NEW.member_id;
	end; end if;
	if OLD.type = '지출' and NEW.type = '지출' then begin
		update have_money set 
		have_money.balance = have_money.balance + OLD.amount - NEW.amount
		where have_money.member_id = NEW.member_id;
	end; end if;
	if OLD.type = '수입' and NEW.type = '지출' then begin
		update have_money set 
		have_money.balance = have_money.balance - OLD.amount - NEW.amount
		where have_money.member_id = NEW.member_id;
	end; end if;
	if OLD.type = '지출' and NEW.type = '수입' then begin
		update have_money set 
		have_money.balance = have_money.balance + OLD.amount + NEW.amount
		where have_money.member_id = NEW.member_id;
	end; end if;
END$$
DELIMITER ;