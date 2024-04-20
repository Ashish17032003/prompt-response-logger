import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private apiUrl = "/api/chat";

  constructor(private http: HttpClient) {}

  postChat(prompt: string): Observable<any> {
    const data = {
      message: prompt,
    };

    return this.http.post<any>(this.apiUrl, data);
  }

  getChatData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
