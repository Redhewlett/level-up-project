import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HeaderComponent } from './components/header/header.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserStatsComponent } from './components/user-stats/user-stats.component';
import { AdventureComponent } from './components/adventure/adventure.component';
import { AdventureInfoComponent } from './components/adventure-info/adventure-info.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemPipe } from './pipes/item.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    HeaderComponent,
    UserInfoComponent,
    UserStatsComponent,
    AdventureComponent,
    AdventureInfoComponent,
    ItemPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
