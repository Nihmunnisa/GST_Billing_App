import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GST Billing App';
 prodcode: 'Product_Code';
  prodname: 'Product_Name';
  prodprice: 'Product_Price';
  prodgst= 'Product_GST';

  Add_Product()
  {
    alert(this.title);
  }
}
