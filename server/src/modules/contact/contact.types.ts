import { ContactDTO } from './contact.dto';

export type ContactUpdateDTO = Partial<Omit<ContactDTO, 'id'>>;
