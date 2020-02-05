import { Component, Inject, OnInit } from '@angular/core';
import { IProgrammcommands, PrCommandsService } from './PrCommandsService';

@Component({
  selector: 'app-table-programm-commands',
  templateUrl: './table-programm-commands.component.html',
  styleUrls: ['./table-programm-commands.component.css']
})
export class TableProgrammCommandsComponent {
    public commands: IProgrammcommands[];
    constructor(private commandService: PrCommandsService) {
        this.commandService.subject.subscribe(this.commandReceived);
  }

    commandReceived = (data: IProgrammcommands[]) => {
        this.commands = data;
  }

  ngOnInit() {
      this.commandService.getCommand();
  }

}
