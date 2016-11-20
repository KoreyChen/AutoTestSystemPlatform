#include "atsp.h"
#include "ui_atsp.h"

ATSP::ATSP(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::ATSP)
{
   ui->setupUi(this);
   //创建实例化调试窗口
   P_testsystemform=new TestSystemForm() ;
   P_commonform=new CommonForm();
   P_welcomeform=new WelcomeForm();
   P_ethernetform=new EthernetForm();
   P_canform =new CanForm();
   P_fullform=new FullForm();
   P_iicspiform=new IICSPI();

   //传递串口指针,将其他几个窗口类传递给测试窗口
   P_testsystemform->T_commonform=P_commonform;
   P_testsystemform->T_canform=P_canform;
   P_testsystemform->T_ethernetform=P_ethernetform;

   //加载起始页面
   SetAreaWidget(1);
   msgLabel = new QLabel;
   msgLabel->setMinimumSize(msgLabel->sizeHint());
   msgLabel->setAlignment(Qt::AlignHCenter);
   msgLabel->setText("   成功启动，欢迎使用ATSP测试系统！");
   ui->statusBar->addWidget(msgLabel);
   ui->statusBar->setStyleSheet(QString("QStatusBar::item{border: 0px}"));
}

ATSP::~ATSP()
{
    delete ui;
}

void ATSP::SetAreaWidget(int num)
{

    static  int  *indexForm = new int(0);

    if(((num>=0)&&(num<8))&&((*indexForm>=0)&&(*indexForm<8)))
    {
        ui->welcomeToolButton->setAutoRaise(true);
        ui->atspToolButton->setAutoRaise(true);
        ui->commonToolButton->setAutoRaise(true);
        ui->rs485ToolButton->setAutoRaise(true);
        ui->canToolButton->setAutoRaise(true);
        ui->ethernetToolButton->setAutoRaise(true);
        ui->helpToolButton->setAutoRaise(true);
        ui->iicspiToolButton->setAutoRaise(true);

        switch(*indexForm)
        {
        case 0: break;
        case 1:
            if(num!=1)
            {
                ui->gridLayout->removeWidget(P_welcomeform);
                P_welcomeform->hide();
            }
            break;
        case 2:
            if(num!=2)
            {
                ui->gridLayout->removeWidget(P_testsystemform);
                P_testsystemform->hide();
            }
            break;
        case 3:
            if(num!=3)
            {
                ui->gridLayout->removeWidget(P_commonform);
                P_commonform->hide();
            }
            break;
        case 4:
            if(num!=4)
            {
                ui->gridLayout->removeWidget(P_commonform);
                P_commonform->hide();
            }
            break;
        case 5:
            if(num!=5)
            {
                ui->gridLayout->removeWidget(P_canform );
               P_canform ->hide();
            }
            break;
        case 6:
            if(num!=6)
            {
                ui->gridLayout->removeWidget(P_ethernetform);
                P_ethernetform->hide();
            }
            break;
        case 7:
            if(num!=7)
            {
                ui->gridLayout->removeWidget(P_iicspiform);
                P_iicspiform->hide();
            }
            break;

        default : break;
        }
        switch(num)
        {
        case 1  :
            if(*indexForm!=1)
            {
                *indexForm=1;
                ui->gridLayout->addWidget(P_welcomeform);
                P_welcomeform->show();
                ui->welcomeToolButton->setAutoRaise(false);
            }
            break;
        case 2  :
            if(*indexForm!=2)
            {
                *indexForm=2;
                ui->gridLayout->addWidget(P_testsystemform);
                P_testsystemform->show();
                ui->atspToolButton->setAutoRaise(false);
            }
            break;
        case 3  :
            if(*indexForm!=3)
            {
                *indexForm=3;
                ui->gridLayout->addWidget(P_commonform);
                P_commonform->show();
                ui->commonToolButton->setAutoRaise(false);
            }
            break;
        case 4  :
            if(*indexForm!=4)
            {
                *indexForm=4;
                ui->gridLayout->addWidget(P_commonform);
                P_commonform->show();
                ui->rs485ToolButton->setAutoRaise(false);
            }
            break;

        case 5  :
            if(*indexForm!=5)
            {
                *indexForm=5;
                ui->gridLayout->addWidget(P_canform);
                P_canform->show();
                ui->canToolButton->setAutoRaise(false);
            }
            break;
        case 6  :
            if(*indexForm!=6)
            {
                *indexForm=6;
                ui->gridLayout->addWidget(P_ethernetform);
                P_ethernetform->show();
                ui->ethernetToolButton->setAutoRaise(false);
            }
            break;
        case 7  :
            if(*indexForm!=7)
            {
                *indexForm=7;
                ui->gridLayout->addWidget(P_iicspiform);
                P_iicspiform->show();
                ui->iicspiToolButton->setAutoRaise(false);
            }
            break;
        default : break;

        }
    }
}

void ATSP::on_welcomeToolButton_clicked()
{
    SetAreaWidget(1);

}

void ATSP::on_atspToolButton_clicked()
{
     SetAreaWidget(2);
}

void ATSP::on_commonToolButton_clicked()
{
     SetAreaWidget(3);
}

void ATSP::on_rs485ToolButton_clicked()
{
     SetAreaWidget(4);
}

void ATSP::on_canToolButton_clicked()
{
     SetAreaWidget(5);
}

void ATSP::on_ethernetToolButton_clicked()
{
     SetAreaWidget(6);
}
void ATSP::on_iicspiToolButton_clicked()
{
     SetAreaWidget(7);
}
void ATSP::on_actionAbout_triggered()
{
    AboutDialog aboutdialog;//= new AboutDialog;
    aboutdialog.show();
    aboutdialog.exec();
}

void ATSP::on_actionHelp_triggered()
{
     HelpDialog helpdialog;
     helpdialog.show();
     helpdialog.exec();
}

void ATSP::on_actionOpen_O_triggered()
{
    QFileDialog filedialog;
    filedialog.show();
    filedialog.exec();
}

void ATSP::on_actionPrintScreen_triggered()
{
    //this-=QPixmap:
    QDateTime time = QDateTime::currentDateTime();//获取系统现在的时间

    QString fileName="IMG_"+time.toString("yyyyMMdd_hhmmss")+".png"; //设置显示格式
    QString str="   \""+fileName+"\" is saved!";
    fileName="./screenshot/"+fileName;//添加路径
    QClipboard *clipboard=QApplication::clipboard();
    this->pixmap=QPixmap::grabWindow(QApplication::desktop()->winId());
    clipboard->setPixmap(this->pixmap);
    this->pixmap.save(fileName);
    this->msgLabel->setText(str);
    qApp->beep();
}

void ATSP::on_actionViewPictures_triggered()
{
    QString fileFull="./screenshot/";
    QFileInfo fi=QFileInfo(fileFull);
    QString filePath;
    filePath=fi.absolutePath()+"/screenshot";
    QDesktopServices::openUrl(QUrl(filePath, QUrl::TolerantMode));
    filePath="   Open path:"+filePath;
    this->msgLabel->setText(filePath);
}

void ATSP::on_actionToolsBar_triggered()
{
    if(ui->mainToolBar->isVisible())
    {
        ui->mainToolBar->hide();
    }else
        if(ui->mainToolBar->isHidden())
        {
            ui->mainToolBar->setVisible(true);
        }
}

void ATSP::on_actionTopScreen_triggered()
{
    ui->gridLayout->removeWidget(P_commonform);
    P_fullform->F_commonform=P_commonform;
    P_fullform->show();

}


