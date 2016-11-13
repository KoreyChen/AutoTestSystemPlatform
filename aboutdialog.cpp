#include "aboutdialog.h"
#include "ui_aboutdialog.h"

AboutDialog::AboutDialog(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::AboutDialog)
{
    ui->setupUi(this);

////    this->im = new QImage();
//    QImage *image=new QImage();
//    QGraphicsScene *scene;
//    image->load("Green.png");
//   // QGraphicsView *view = new QGraphicsView( scene,this );
//   // QPixmap *pixmap = new QPixmap("Green.png");
//    //scene->addPixmap(*pixmap);
//    scene->addPixmap(QPixmap::fromImage(*image));
//   // view->show();
// //   scene->addPixmap( QPixmap("Green.ico") );
//    ui->LogoGraphicsView->setScene(scene);
//    ui->LogoGraphicsView->show();
}

AboutDialog::~AboutDialog()
{
    delete ui;
}
