import { Injectable } from '@nestjs/common';
import { ReactionsService } from 'src/reactions/reactions.service';
import { SituationsService } from 'src/situations/situations.service';

@Injectable()
export class GameService {
  constructor(
    private readonly situationsService: SituationsService,
    private readonly reactionsService: ReactionsService,
  ) {}
  createGame() {
    const situations = this.situationsService.situations({});
    const reactions = this.reactionsService.reactions({});
    return { situations, reactions };
  }

  generateRoles(players: string[]) {
    return players.map((p) => ({}));
  }
}
