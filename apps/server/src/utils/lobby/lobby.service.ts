export class LobbyService {
  private prefix = 'lobby';
  createLobbyName = (name: string) => `${this.prefix}-${name}`;
  isCustomLobby = (name: string) => name.startsWith(this.prefix);
  parceLobbyName = (name: string) => name.split('-')[1];
}
