import { Component } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Menu } from '../menu/menu';

const supabase = createClient(environment.apiUrl, environment.publicAnonKey);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Menu],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  

}
