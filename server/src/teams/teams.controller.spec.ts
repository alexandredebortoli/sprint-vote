import { Test, TestingModule } from '@nestjs/testing';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';
import { HttpStatus, NotFoundException } from '@nestjs/common';

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
        name: 'Test Team',
      };
      const createdTeam: Team = new Team(createTeamDto);

      jest.spyOn(teamsService, 'create').mockResolvedValue(createdTeam);

      const result = await controller.create(createTeamDto);

      expect(result).toBe(createdTeam);
      expect(HttpStatus.CREATED);
    });
  });

  describe('findAll', () => {
    it('should find and return a list of teams with status 200 - OK', async () => {
      const teamList: Team[] = [
        new Team({ name: 'Team 1' }),
        new Team({ name: 'Team 2' }),
      ];

      jest.spyOn(teamsService, 'findAll').mockResolvedValue(teamList);

      const result = await controller.findAll();

      expect(result).toEqual(teamList);
      expect(HttpStatus.OK);
    });
  });

  describe('findOne', () => {
    it('should find a team by id and return it with status 200 - OK', async () => {
      const team: Team = new Team({ id: '1', name: 'Team Test' });

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
      } finally {
        expect(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('remove', () => {
    it('should find a team by id and remove it returning status 204 - NO CONTENT', async () => {
      jest.spyOn(teamsService, 'remove').mockResolvedValue();

      await controller.remove('1');

      expect(HttpStatus.NO_CONTENT);
    });

    it('should return not found exception status 404 - NOT FOUND', async () => {
      jest
        .spyOn(teamsService, 'remove')
        .mockRejectedValue(new NotFoundException());
      try {
        await controller.remove('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      } finally {
        expect(HttpStatus.NOT_FOUND);
      }
    });
  });
});
