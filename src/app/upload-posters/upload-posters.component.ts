import { Component, OnInit, Input, Output } from '@angular/core';
import {PosterServiceService} from '../poster-service.service';
import {Observable, of} from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-upload-posters',
  templateUrl: './upload-posters.component.html',
  styleUrls: ['./upload-posters.component.css']
})
export class UploadPostersComponent implements OnInit {



 name:string;
 url:any;
 uploadForm:FormGroup;
 
  OnFileChange(event) { // called each time file input changes

  alert("File changed");
    if (event.target.files && event.target.files[0]) {
      const file= event.target.files[0];
      console.log(file);
      this.uploadForm.get('poster').setValue(file);
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target;
      }

      
    }
}

OnSubmit()
{
  const formdata = new FormData();
   const headers = new HttpHeaders()
                        .set('Authorization', 'my-auth-token');
                        
                        headers.append('enctype', 'multipart/form-data');
 this.appendform().subscribe(data=>
  

  {
  this.httpClient.post<any>('http://127.0.0.1:4000/api/postposters',data, {headers:headers}).subscribe(
   (res) =>console.log(res),
    (err) => console.log(err)


  );}
  );

}
appendform():Observable<any>
{
const formdata = new FormData();
formdata.append('file',this.uploadForm.get('poster').value);
formdata.append('name', this.name);
return of(formdata);
}

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit() {

  this.uploadForm = this.formBuilder.group({
      poster: ['']
    });
  }

}
