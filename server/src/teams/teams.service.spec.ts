import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { NotFoundException } from '@nestjs/common';

describe('TeamsService', () => {
  let service: TeamsService;
  let mockTeamRepository: Repository<Team>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: getRepositoryToken(Team),
          useClass: Repository<Team>,
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
    mockTeamRepository = module.get<Repository<Team>>(getRepositoryToken(Team));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockTeamRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new team', async () => {
      const createTeamDto: CreateTeamDto = {
        name: 'Test Team',
      };

      const savedTeam = new Team(createTeamDto);
      jest.spyOn(mockTeamRepository, 'save').mockResolvedValue(savedTeam);

      const result = await service.create(createTeamDto);

      expect(result).toEqual(savedTeam);
    });
  });

  describe('findAll', () => {
    it('should find and return a list of teams', async () => {
      const teamList: Team[] = [
        new Team({ name: 'Team 1' }),
        new Team({ name: 'Team 2' }),
      ];

      jest.spyOn(mockTeamRepository, 'find').mockResolvedValue(teamList);

      const result = await service.findAll();

      expect(result).toEqual(teamList);
    });
  });

  describe('findOne', () => {
    it('should find a team by id and return it', async () => {
      const team: Team = new Team({ id: '1', name: 'Team Test' });

      jest.spyOn(mockTeamRepository, 'findOne').mockResolvedValue(team);

      const result = await service.findOne('1');

      expect(result).toEqual(team);
    });

    it('should return not found exception', async () => {
      jest.spyOn(mockTeamRepository, 'findOne').mockResolvedValue(null);

      try {
        await service.findOne('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove', () => {
    it('should find a team by id and remove it', async () => {
      const team: Team = new Team({ id: '1', name: 'Team Test' });

      jest.spyOn(mockTeamRepository, 'findOne').mockResolvedValue(team);
      jest
        .spyOn(mockTeamRepository, 'delete')
        .mockResolvedValue(new DeleteResult());

      const result = await service.remove('1');

      expect(mockTeamRepository['delete']).toHaveBeenCalledWith(team);
    });

    it('should return not found exception', async () => {
      jest.spyOn(mockTeamRepository, 'findOne').mockResolvedValue(null);
      try {
        await service.remove('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
