import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { ServiceComponent } from './components/service/service.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ChooseUsComponent } from './components/choose-us/choose-us.component';
import { EventsComponent } from './components/events/events.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { BlogComponent } from './components/blog/blog.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PdfPipe } from './pipes/pdf.pipe';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { UserTypePipe } from './pipes/user-type.pipe';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserComponent } from './components/user/user.component';
import { AccompagnantComponent } from './components/accompagnant/accompagnant.component';
import { ClientComponent } from './components/client/client.component';
import { Blog2Component } from './components/blog2/blog2.component';
import { PubTableComponent } from './components/pub-table/pub-table.component';
import { DisplayPubComponent } from './components/display-pub/display-pub.component';
import { DisplayAccomComponent } from './components/display-accom/display-accom.component';





// import { BehaviorSubject, Observable } from 'rxjs';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BannerComponent,
    ServiceComponent,
    AboutUsComponent,
    ChooseUsComponent,
    EventsComponent,
    TestimonialsComponent,
    BlogComponent,
    AppointmentComponent,
    SignupComponent,
    PdfPipe,
    LoginComponent,
    AdminComponent,
    UsersTableComponent,
    UserTypePipe,
    UserInfoComponent,
    UserComponent,
    AccompagnantComponent,
    ClientComponent,
    Blog2Component,
    PubTableComponent,
    DisplayPubComponent,
    DisplayAccomComponent,
   
   
   
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwPaginationModule,
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
