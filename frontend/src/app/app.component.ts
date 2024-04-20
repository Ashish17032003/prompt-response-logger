import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ChatService } from "./chat.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  chatControl = new FormControl("");

  displayedColumns: string[] = [
    "ChatId",
    "CreatedAt",
    "Status",
    "Prompt",
    "Response",
    "Model",
    "InputTokens",
    "PromptTokens",
    "Latency",
  ];

  chatList!: any;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.getChats();
  }

  onSubmit() {
    const promptValue = this.chatControl.value!;
    console.log(promptValue);
    this.chatService.postChat(promptValue).subscribe(
      (response) => {
        console.log("Response from server:", response);
      },
      (error) => {
        console.error("Error:", error);
      }
    );

    this.getChats();
  }

  getChats(): void {
    this.chatService.getChatData().subscribe((res) => {
      if (res) {
        this.chatList = res;
        console.log(this.chatList);
      }
    });
  }
}
