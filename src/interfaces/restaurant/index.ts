import { EmployeeInterface } from 'interfaces/employee';
import { MenuItemInterface } from 'interfaces/menu-item';
import { TableLayoutInterface } from 'interfaces/table-layout';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface RestaurantInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  employee?: EmployeeInterface[];
  menu_item?: MenuItemInterface[];
  table_layout?: TableLayoutInterface[];
  user?: UserInterface;
  _count?: {
    employee?: number;
    menu_item?: number;
    table_layout?: number;
  };
}

export interface RestaurantGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
