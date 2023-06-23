import { TableLayoutInterface } from 'interfaces/table-layout';
import { GetQueryInterface } from 'interfaces';

export interface ReservationInterface {
  id?: string;
  guest_name: string;
  guest_phone_number: string;
  guest_email: string;
  reservation_time: any;
  number_of_guests: number;
  table_layout_id: string;
  created_at?: any;
  updated_at?: any;

  table_layout?: TableLayoutInterface;
  _count?: {};
}

export interface ReservationGetQueryInterface extends GetQueryInterface {
  id?: string;
  guest_name?: string;
  guest_phone_number?: string;
  guest_email?: string;
  table_layout_id?: string;
}
