import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted User ID is: ${this.id}`);
  }
}
