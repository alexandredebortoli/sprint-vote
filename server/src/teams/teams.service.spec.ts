import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import { Repository } from 'typeorm';
import { TeamEntity } from '../database/entities/team.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamDto } from './dto/team.dto';
import { HttpStatus, NotFoundException } from '@nestjs/common';

describe('TeamsService', () => {
  let service: TeamsService;
  let mockTeamRepository: Repository<TeamEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: getRepositoryToken(TeamEntity),
          useClass: Repository<TeamEntity>,
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
    mockTeamRepository = module.get<Repository<TeamEntity>>(
      getRepositoryToken(TeamEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockTeamRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new team', async () => {
      const createTeamDto: CreateTeamDto = {
        name: 'Team Hello World',
      };

      const dbReturn = new TeamEntity({ ...createTeamDto }, '1');
      jest.spyOn(mockTeamRepository, 'save').mockResolvedValue(dbReturn);

      const result = await service.create(createTeamDto);

      expect(result).toEqual(new TeamDto(dbReturn));
    });
  });

  describe('findAll', () => {
    it('should find and return a list of teams', async () => {
      const expectedList: TeamDto[] = [
        {
          id: '1',
          name: 'Team 1',
        },
        {
          id: '2',
          name: 'Team 2',
        },
      ];

      const dbReturn: TeamEntity[] = [
        {
          id: '1',
          name: 'Team 1',
        },
        {
          id: '2',
          name: 'Team 2',
        },
      ] as TeamEntity[];

      jest.spyOn(mockTeamRepository, 'find').mockResolvedValue(dbReturn);

      const result = await service.findAll();

      expect(result).toEqual(expectedList);
    });
  });

  describe('findOne', () => {
    it('should find a team by id and return it', async () => {
      const dbReturn: TeamEntity = {
        id: '1',
        name: 'Team Test',
      } as TeamEntity;

      const expectedReturn: TeamDto = new TeamDto(dbReturn);

      jest.spyOn(mockTeamRepository, 'findOne').mockResolvedValue(dbReturn);

      const result = await service.findOne('1');

      expect(result).toEqual(expectedReturn);
    });

    it('should return not found exception', async () => {
      jest.spyOn(mockTeamRepository, 'findOne').mockResolvedValue(null);

      try {
        await service.findOne('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        if (error instanceof NotFoundException) {
          expect(error.getStatus()).toEqual(HttpStatus.NOT_FOUND);
          expect(error.message).toEqual('team_not_found');
        }
      }
    });
  });

  describe('remove', () => {
    it('should find a team by id and remove it', async () => {
      const team: TeamEntity = new TeamEntity({ name: 'Team Test' }, '1');

      jest.spyOn(mockTeamRepository, 'findOne').mockResolvedValue(team);

      const result = await service.remove('1');

      expect(mockTeamRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should return not found exception', async () => {
      jest.spyOn(mockTeamRepository, 'findOne').mockResolvedValue(null);

      try {
        await service.findOne('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        if (error instanceof NotFoundException) {
          expect(error.getStatus()).toEqual(HttpStatus.NOT_FOUND);
          expect(error.message).toEqual('team_not_found');
        }
      }
    });
  });
});
