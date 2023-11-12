import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamDto } from './dto/team.dto';
import { TeamEntity } from '../database/entities/team.entity';

describe('TeamsController', () => {
  let controller: TeamsController;
  let teamsService: TeamsService;

  beforeAll(async () => {
    const mockTeamsService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [
        {
          provide: TeamsService,
          useValue: mockTeamsService,
        },
      ],
    }).compile();

    controller = module.get<TeamsController>(TeamsController);
    teamsService = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(teamsService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new team and return status 201 - CREATED', async () => {
      const createTeamDto: CreateTeamDto = {
        name: 'Team Hello World',
      };
      const team: TeamDto = new TeamDto({
        ...createTeamDto,
        id: '1',
      } as TeamEntity);

      jest.spyOn(teamsService, 'create').mockResolvedValue(team);

      const result = await controller.create(createTeamDto);

      expect(result).toBe(team);
      expect(HttpStatus.CREATED);
    });
  });

  describe('findAll', () => {
    it('should find and return a list of teams with status 200 - OK', async () => {
      const teamList: TeamDto[] = [
        {
          id: '1',
          name: 'Player 1',
        },
        {
          id: '2',
          name: 'Player 2',
        },
      ];

      jest.spyOn(teamsService, 'findAll').mockResolvedValue(teamList);

      const result = await controller.findAll();

      expect(result).toEqual(teamList);
      expect(HttpStatus.OK);
    });
  });

  describe('findOne', () => {
    it('should find a team by id and return it with status 200 - OK', async () => {
      const team: TeamDto = new TeamDto({
        id: '1',
        name: 'Player Test',
      } as TeamEntity);

      jest.spyOn(teamsService, 'findOne').mockResolvedValue(team);

      const result = await controller.findOne('1');

      expect(result).toEqual(team);
      expect(HttpStatus.OK);
    });

    it('should return not found exception status 404 - NOT FOUND', async () => {
      jest
        .spyOn(teamsService, 'findOne')
        .mockRejectedValue(new NotFoundException());

      try {
        await controller.findOne('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        if (error instanceof NotFoundException) {
          expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
        }
      }
    });
  });

  describe('remove', () => {
    it('should find a team by id and delete it returning status 204 - NO CONTENT', async () => {
      jest.spyOn(teamsService, 'remove').mockResolvedValue();

      await controller.remove('1');

      expect(teamsService.remove).toHaveBeenCalledWith('1');
    });

    it('should return not found exception status 404 - NOT FOUND', async () => {
      jest
        .spyOn(teamsService, 'remove')
        .mockRejectedValue(new NotFoundException());
      try {
        await controller.remove('-1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        if (error instanceof NotFoundException) {
          expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
        }
      }
    });
  });
});
