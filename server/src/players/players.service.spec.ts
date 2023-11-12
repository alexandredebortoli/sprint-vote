import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { PlayersService } from './players.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { PlayerDto } from './dto/player.dto';
import { PlayerEntity } from '../database/entities/player.entity';
import {
  ConflictException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ChangePlayerNameDto } from './dto/change-player-name.dto';

describe('PlayersService', () => {
  let service: PlayersService;
  let mockPlayerRepository: Repository<PlayerEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: getRepositoryToken(PlayerEntity),
          useClass: Repository<PlayerEntity>,
        },
      ],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
    mockPlayerRepository = module.get<Repository<PlayerEntity>>(
      getRepositoryToken(PlayerEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockPlayerRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new player', async () => {
      const createPlayerDto: CreatePlayerDto = {
        name: 'John Doe',
        username: 'johnDoe',
        password: '123456',
      };

      const dbReturn = new PlayerEntity({ ...createPlayerDto }, '1');
      jest.spyOn(mockPlayerRepository, 'exist').mockResolvedValue(false);
      jest.spyOn(mockPlayerRepository, 'save').mockResolvedValue(dbReturn);

      const result = await service.create(createPlayerDto);

      expect(result).toEqual(new PlayerDto(dbReturn));
    });

    it('should return 409 Conflict username already taken', async () => {
      const createPlayerDto: CreatePlayerDto = {
        name: 'John Doe',
        username: 'johnDoe',
        password: '123456',
      };

      jest.spyOn(mockPlayerRepository, 'exist').mockResolvedValue(true);

      try {
        await service.create(createPlayerDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        if (error instanceof ConflictException) {
          expect(error.getStatus()).toEqual(HttpStatus.CONFLICT);
          expect(error.message).toEqual('username_already_taken');
        }
      }
    });
  });

  describe('findAll', () => {
    it('should find and return a list of players', async () => {
      const expectedList: PlayerDto[] = [
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

      const dbReturn: PlayerEntity[] = [
        {
          id: '1',
          name: 'Player 1',
          username: 'player1',
          password: '123456',
        },
        {
          id: '2',
          name: 'Player 2',
          username: 'player2',
          password: '123456',
        },
      ] as PlayerEntity[];

      jest.spyOn(mockPlayerRepository, 'find').mockResolvedValue(dbReturn);

      const result = await service.findAll();

      expect(result).toEqual(expectedList);
    });
  });

  describe('findOne', () => {
    it('should find a player by id and return it', async () => {
      const dbReturn: PlayerEntity = {
        id: '1',
        name: 'Player Test',
        username: 'player-test',
        password: '123456',
      } as PlayerEntity;

      const expectedReturn: PlayerDto = new PlayerDto(dbReturn);

      jest.spyOn(mockPlayerRepository, 'findOne').mockResolvedValue(dbReturn);

      const result = await service.findOne('1');

      expect(result).toEqual(expectedReturn);
    });

    it('should return not found exception', async () => {
      jest.spyOn(mockPlayerRepository, 'findOne').mockResolvedValue(null);

      try {
        await service.findOne('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        if (error instanceof NotFoundException) {
          expect(error.getStatus()).toEqual(HttpStatus.NOT_FOUND);
          expect(error.message).toEqual('player_not_found');
        }
      }
    });
  });

  describe('changeName', () => {
    it('should find a player by id and change its name', async () => {
      const dbReturn: PlayerEntity = {
        id: '1',
        name: 'Player Test',
        username: 'player-test',
        password: '123456',
      } as PlayerEntity;

      jest.spyOn(mockPlayerRepository, 'findOne').mockResolvedValue(dbReturn);
      jest
        .spyOn(mockPlayerRepository, 'save')
        .mockResolvedValue({ ...dbReturn, name: 'John Doe' } as PlayerEntity);

      await service.changeName('1', {
        name: 'John Doe',
      } as ChangePlayerNameDto);

      expect(mockPlayerRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(mockPlayerRepository.save).toHaveBeenCalledWith({
        ...dbReturn,
        name: 'John Doe',
      });
    });

    it('should return not found exception', async () => {
      jest.spyOn(mockPlayerRepository, 'findOne').mockResolvedValue(null);

      try {
        await service.changeName('1', {
          name: 'John Doe',
        } as ChangePlayerNameDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        if (error instanceof NotFoundException) {
          expect(error.getStatus()).toEqual(HttpStatus.NOT_FOUND);
          expect(error.message).toEqual('player_not_found');
        }
      }
    });
  });
});
