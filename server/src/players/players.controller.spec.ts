import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import {
  ConflictException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PlayerEntity } from '../database/entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerDto } from './dto/player.dto';

describe('PlayersController', () => {
  let controller: PlayersController;
  let playersService: PlayersService;

  beforeAll(async () => {
    const mockPlayersService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      changeName: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [
        {
          provide: PlayersService,
          useValue: mockPlayersService,
        },
      ],
    }).compile();

    controller = module.get<PlayersController>(PlayersController);
    playersService = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(playersService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new player and return status 201 - CREATED', async () => {
      const createPlayerDto: CreatePlayerDto = {
        name: 'Test Player',
        username: 'testplayer',
        password: '123456',
      };
      const player: PlayerDto = new PlayerDto({
        ...createPlayerDto,
        id: '1',
      } as PlayerEntity);

      jest.spyOn(playersService, 'create').mockResolvedValue(player);

      const result = await controller.create(createPlayerDto);

      expect(result).toBe(player);
      expect(HttpStatus.CREATED);
    });

    it('should return username already taken status 409 - CONFLICT', async () => {
      const createPlayerDto: CreatePlayerDto = {
        name: 'Test Player',
        username: 'testplayer',
        password: '123456',
      };

      jest
        .spyOn(playersService, 'create')
        .mockRejectedValue(new ConflictException('username_already_taken'));

      try {
        await controller.create(createPlayerDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      } finally {
        expect(HttpStatus.CONFLICT);
      }
    });
  });

  describe('findAll', () => {
    it('should find and return a list of players with status 200 - OK', async () => {
      const playerList: PlayerDto[] = [
        {
          id: '1',
          name: 'Player 1',
          username: 'player1',
        },
        {
          id: '2',
          name: 'Player 2',
          username: 'player2',
        },
      ];

      jest.spyOn(playersService, 'findAll').mockResolvedValue(playerList);

      const result = await controller.findAll();

      expect(result).toEqual(playerList);
      expect(HttpStatus.OK);
    });
  });

  describe('findOne', () => {
    it('should find a player by id and return it with status 200 - OK', async () => {
      const player: PlayerDto = new PlayerDto({
        id: '1',
        name: 'Player Test',
        username: 'player-test',
        password: '123456',
      } as PlayerEntity);

      jest.spyOn(playersService, 'findOne').mockResolvedValue(player);

      const result = await controller.findOne('1');

      expect(result).toEqual(player);
      expect(HttpStatus.OK);
    });

    it('should return not found exception status 404 - NOT FOUND', async () => {
      jest
        .spyOn(playersService, 'findOne')
        .mockRejectedValue(new NotFoundException());

      try {
        await controller.findOne('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      } finally {
        expect(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('changeName', () => {
    it('should find a player by id and change its name returning status 204 - NO CONTENT', async () => {
      jest.spyOn(playersService, 'changeName').mockResolvedValue();

      await controller.changeName('1', { name: 'John Doe' });

      expect(HttpStatus.NO_CONTENT);
    });

    it('should return not found exception status 404 - NOT FOUND', async () => {
      jest
        .spyOn(playersService, 'changeName')
        .mockRejectedValue(new NotFoundException());
      try {
        await controller.changeName('-1', { name: 'John Doe' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      } finally {
        expect(HttpStatus.NOT_FOUND);
      }
    });
  });
});
