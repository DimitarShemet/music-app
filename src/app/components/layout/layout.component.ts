import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReplaySubject, takeUntil } from 'rxjs';
import { ISong } from 'src/app/interfaces/song.interface';
import { ApiService } from 'src/app/services/api.service';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  public dataSource!: MatTableDataSource<ISong>;
  public displayedColumns: string[] = ['id', 'title', 'preview'];
  private _destroy$: ReplaySubject<null> = new ReplaySubject<null>(1);

  constructor(private apiService: ApiService) {}

  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild('container', { read: ViewContainerRef })
  private container!: ViewContainerRef;

  ngOnInit(): void {
    this.apiService
      .fetchData()
      .pipe(takeUntil(this._destroy$))
      .subscribe((value) => {
        this.dataSource = new MatTableDataSource<ISong>(value);
        this.dataSource.paginator = this.paginator;
      });
  }
  ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  selectItem(item: ISong): void {
    this.container.clear();
    const componentRef = this.container.createComponent(PlayerComponent);
    componentRef.instance.source = item.preview;
  }
}
