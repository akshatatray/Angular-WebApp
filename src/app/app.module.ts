import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { EditComponent } from './components/edit/edit.component';
import { PostComponent } from './components/post/post.component';
import { ShowPostsComponent } from './components/show-posts/show-posts.component';
import { ThemeChangerComponent } from './components/theme-changer/theme-changer.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { PostWIdComponent } from './components/post-w-id/post-w-id.component';
import { ContactUserComponent } from './components/contact-user/contact-user.component';
import { SocialLoginsComponent } from './components/social-logins/social-logins.component';
import { VerifyComponent } from './components/verify/verify.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    RegisterComponent,
    NavbarComponent,
    EditComponent,
    PostComponent,
    ShowPostsComponent,
    ThemeChangerComponent,
    MyPostsComponent,
    PostWIdComponent,
    ContactUserComponent,
    SocialLoginsComponent,
    VerifyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
