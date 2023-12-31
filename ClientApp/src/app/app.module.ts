import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, SecurityContext} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { AngularMarkdownEditorModule } from 'angular-markdown-editor'

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ArticoleComponent } from './fetch-data/articole.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { TokenInterceptor } from './helpers/token.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input'; 
import { AccountModule } from './account/account.module';
import { MatSortModule} from '@angular/material/sort'
import { PostsComponent } from './posts/posts.component';
import { MatSlideToggleModule} from '@angular/material/slide-toggle'
import { LoadingInterceptor } from './helpers/loading.interceptor';
import { CreateArticleComponent } from './create-article/create-article.component';
import {MatSelect, MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ArticoleComponent,
    PostsComponent,
    CreateArticleComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AccountModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'articole/:domeniu', component: ArticoleComponent },
      { path: 'articol/:title', component: PostsComponent },
      { path: 'create-articol', component: CreateArticleComponent}
    ]) ,
    MarkdownModule.forRoot({
      loader: HttpClient, // optional, only if you use [src] attribute
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
          smartLists: true,
          smartypants: false,
        },
      },
      sanitize: SecurityContext.NONE,
    }),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    AngularMarkdownEditorModule.forRoot({
      iconlibrary: 'fa'
    }),
  ],
  providers: [DatePipe,
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
